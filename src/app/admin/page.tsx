"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import { Service, Destination, SuccessStory } from "../../lib/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<"services" | "destinations" | "stories">("services");
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  // Form state for creating/editing service
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceSlug, setServiceSlug] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);

  // Form state for creating/editing destination
  const [destCountry, setDestCountry] = useState("");
  const [destDesc, setDestDesc] = useState("");
  const [destImg, setDestImg] = useState("");
  const [editingDestId, setEditingDestId] = useState<number | null>(null);
  // Form state for creating/editing success story
  const [storyTitle, setStoryTitle] = useState("");
  const [storyCategory, setStoryCategory] = useState("Visa Success");
  const [storyImage, setStoryImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingStoryId, setEditingStoryId] = useState<number | null>(null);


  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: sData } = await supabase.from("services").select("*").order("id", { ascending: true });
      const { data: dData } = await supabase.from("destinations").select("*").order("id", { ascending: true });
      const { data: stData } = await supabase.from("success_stories").select("*").order("id", { ascending: false });
      if (stData) setStories(stData);
      if (sData) setServices(sData);
      if (dData) setDestinations(dData);
    } catch (e) {
      console.error("Error fetching admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setStatusMsg("");

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `story-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

      // Try uploading to Supabase Storage bucket 'success-stories'
      const { data, error } = await supabase.storage
        .from("success-stories")
        .upload(fileName, file, { cacheControl: "3600", upsert: true });

      if (!error && data) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("success-stories").getPublicUrl(fileName);
        setStoryImage(publicUrl);
        setStatusMsg("Image uploaded successfully!");
      } else {
        // Fallback: Read as Data URL (instant preview & storage directly in DB)
        const reader = new FileReader();
        reader.onloadend = () => {
          setStoryImage(reader.result as string);
          setStatusMsg("Image loaded from device!");
        };
        reader.readAsDataURL(file);
      }
    } catch (err: unknown) {
      console.warn("Storage upload error, using local data URL fallback:", err);
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoryImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  // --- SERVICE ACTIONS ---
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");

    try {
      if (editingServiceId) {
        const { error } = await supabase
          .from("services")
          .update({
            title: serviceTitle,
            slug: serviceSlug,
            description: serviceDesc,
          })
          .eq("id", editingServiceId);

        if (error) throw error;
        setStatusMsg("Service updated successfully!");
      } else {
        const { error } = await supabase.from("services").insert({
          title: serviceTitle,
          slug: serviceSlug,
          description: serviceDesc,
          is_published: true,
        });

        if (error) throw error;
        setStatusMsg("Service created successfully!");
      }

      setServiceTitle("");
      setServiceSlug("");
      setServiceDesc("");
      setEditingServiceId(null);
      fetchData();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMsg(`Error: ${err.message}`);
      }
    }
  };

  const handleTogglePublishService = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from("services")
      .update({ is_published: !currentStatus })
      .eq("id", id);
    if (!error) fetchData();
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (!error) fetchData();
  };

  const handleEditService = (s: Service) => {
    setEditingServiceId(s.id);
    setServiceTitle(s.title);
    setServiceSlug(s.slug);
    setServiceDesc(s.description);
  };

    // --- SUCCESS STORIES ACTIONS ---
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");

    const cleanImageUrl = storyImage.trim();
    if (!cleanImageUrl) {
      setStatusMsg("Please provide a valid image URL or upload a file from your device.");
      return;
    }

    try {
      if (editingStoryId) {
        const { error } = await supabase
          .from("success_stories")
          .update({
            title: storyTitle.trim(),
            category: storyCategory.trim(),
            image_url: cleanImageUrl,
          })
          .eq("id", editingStoryId);

        if (error) throw error;
        setStatusMsg("Success story updated successfully!");
      } else {
        const { error } = await supabase.from("success_stories").insert({
          title: storyTitle.trim(),
          category: storyCategory.trim(),
          image_url: cleanImageUrl,
          is_published: true,
        });

        if (error) throw error;
        setStatusMsg("Success story added successfully!");
      }

      setStoryTitle("");
      setStoryCategory("Visa Success");
      setStoryImage("");
      setEditingStoryId(null);
      fetchData();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMsg(`Error: ${err.message}`);
      }
    }
  };

  const handleTogglePublishStory = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from("success_stories")
      .update({ is_published: !currentStatus })
      .eq("id", id);
    if (!error) fetchData();
  };

  const handleDeleteStory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this success story?")) return;
    const { error } = await supabase.from("success_stories").delete().eq("id", id);
    if (!error) fetchData();
  };

  const handleEditStory = (st: SuccessStory) => {
    setEditingStoryId(st.id);
    setStoryTitle(st.title);
    setStoryCategory(st.category);
    setStoryImage(st.image_url);
  };

  // --- DESTINATION ACTIONS ---
  const handleSaveDest = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");

    try {
      if (editingDestId) {
        const { error } = await supabase
          .from("destinations")
          .update({
            country_name: destCountry,
            description: destDesc,
            image_url: destImg,
          })
          .eq("id", editingDestId);

        if (error) throw error;
        setStatusMsg("Destination updated successfully!");
      } else {
        const { error } = await supabase.from("destinations").insert({
          country_name: destCountry,
          description: destDesc,
          image_url: destImg,
          is_published: true,
        });

        if (error) throw error;
        setStatusMsg("Destination created successfully!");
      }

      setDestCountry("");
      setDestDesc("");
      setDestImg("");
      setEditingDestId(null);
      fetchData();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMsg(`Error: ${err.message}`);
      }
    }
  };

  const handleTogglePublishDest = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from("destinations")
      .update({ is_published: !currentStatus })
      .eq("id", id);
    if (!error) fetchData();
  };

  const handleDeleteDest = async (id: number) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    const { error } = await supabase.from("destinations").delete().eq("id", id);
    if (!error) fetchData();
  };

  const handleEditDest = (d: Destination) => {
    setEditingDestId(d.id);
    setDestCountry(d.country_name);
    setDestDesc(d.description || "");
    setDestImg(d.image_url || "");
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh", padding: "30px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        {/* Top Navbar */}
        <div
          style={{
            background: "#ffffff",
            padding: "20px 28px",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "25px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <img
              src="/logo.png"
              alt="Global Expert Immigration"
              style={{
                width: "44px",
                height: "44px",
                objectFit: "contain",
                borderRadius: "10px",
                background: "#ffffff",
                padding: "2px",
                boxShadow: "0 2px 10px rgba(10, 25, 47, 0.15)",
                border: "1px solid rgba(15, 43, 92, 0.15)",
              }}
            />
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#0a192f" }}>
                Admin Portal
              </h2>
              <small style={{ color: "#687386" }}>Global Expert Immigration Content Manager</small>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href="/"
              target="_blank"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#0a192f",
                background: "#f0f7ff",
                border: "1px solid rgba(29, 78, 216, 0.15)",
                padding: "8px 14px",
                borderRadius: "8px",
              }}
            >
              View Public Website ↗
            </Link>
            <button
              onClick={handleLogout}
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#b91c1c",
                background: "#fef2f2",
                border: "1px solid #fee2e2",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div
            style={{
              padding: "12px 18px",
              background: statusMsg.startsWith("Error") ? "#fef2f2" : "#f0fdf4",
              border: `1px solid ${statusMsg.startsWith("Error") ? "#fecdd3" : "#bbf7d0"}`,
              color: statusMsg.startsWith("Error") ? "#b91c1c" : "#15803d",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {statusMsg}
          </div>
        )}

        {/* Tab Controls */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
          <button
            onClick={() => setActiveTab("services")}
            style={{
              padding: "10px 22px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              border: "none",
              background: activeTab === "services" ? "linear-gradient(135deg, #0a192f, #1d4ed8)" : "#ffffff",
              color: activeTab === "services" ? "#ffffff" : "#475569",
              boxShadow: activeTab === "services" ? "0 4px 15px rgba(10, 25, 47, 0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            Services ({services.length})
          </button>
          <button
            onClick={() => setActiveTab("destinations")}
            style={{
              padding: "10px 22px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              border: "none",
              background: activeTab === "destinations" ? "linear-gradient(135deg, #0a192f, #1d4ed8)" : "#ffffff",
              color: activeTab === "destinations" ? "#ffffff" : "#475569",
              boxShadow: activeTab === "destinations" ? "0 4px 15px rgba(10, 25, 47, 0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            Study Destinations ({destinations.length})
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            style={{
              padding: "10px 22px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              border: "none",
              background: activeTab === "stories" ? "linear-gradient(135deg, #0a192f, #1d4ed8)" : "#ffffff",
              color: activeTab === "stories" ? "#ffffff" : "#475569",
              boxShadow: activeTab === "stories" ? "0 4px 15px rgba(10, 25, 47, 0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            Success Stories ({stories.length})
          </button>
        </div>

        {/* TAB 1: SERVICES */}
        {activeTab === "services" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "25px" }}>
            {/* List */}
            <div
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px", color: "#101722" }}>
                Active Services
              </h3>

              {loading ? (
                <p style={{ color: "#687386" }}>Loading services...</p>
              ) : services.length === 0 ? (
                <p style={{ color: "#687386" }}>No services found.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {services.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        padding: "16px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        background: "#fff",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div>
                          <b style={{ fontSize: "15px", color: "#1e293b" }}>{s.title}</b>
                          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
                            slug: <code>{s.slug}</code>
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: "6px",
                            background: s.is_published ? "#dcfce7" : "#f1f5f9",
                            color: s.is_published ? "#15803d" : "#64748b",
                          }}
                        >
                          {s.is_published ? "PUBLISHED" : "DRAFT"}
                        </span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#475569", margin: "10px 0" }}>{s.description}</p>
                      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                        <button
                          onClick={() => handleEditService(s)}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#0369a1",
                            background: "#e0f2fe",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleTogglePublishService(s.id, s.is_published)}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: s.is_published ? "#b45309" : "#15803d",
                            background: s.is_published ? "#fef3c7" : "#dcfce7",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          {s.is_published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDeleteService(s.id)}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#b91c1c",
                            background: "#fee2e2",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form */}
            <div
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                height: "fit-content",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px", color: "#101722" }}>
                {editingServiceId ? "Edit Service" : "Add New Service"}
              </h3>

              <form onSubmit={handleSaveService}>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceTitle}
                    onChange={(e) => {
                      setServiceTitle(e.target.value);
                      if (!editingServiceId) {
                        setServiceSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                      }
                    }}
                    placeholder="e.g. Visa Counselling"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                    Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceSlug}
                    onChange={(e) => setServiceSlug(e.target.value)}
                    placeholder="e.g. visa-counselling"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ marginBottom: "18px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={serviceDesc}
                    onChange={(e) => setServiceDesc(e.target.value)}
                    placeholder="Overview of this immigration or study service..."
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "11px",
                      background: "linear-gradient(135deg, #0a192f, #1d4ed8)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(10, 25, 47, 0.2)",
                    }}
                  >
                    {editingServiceId ? "Update Service" : "Create Service"}
                  </button>
                  {editingServiceId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingServiceId(null);
                        setServiceTitle("");
                        setServiceSlug("");
                        setServiceDesc("");
                      }}
                      style={{
                        padding: "11px 16px",
                        background: "#f1f5f9",
                        color: "#475569",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: DESTINATIONS */}
        {activeTab === "destinations" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "25px" }}>
            {/* List */}
            <div
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px", color: "#101722" }}>
                Active Destinations
              </h3>

              {loading ? (
                <p style={{ color: "#687386" }}>Loading destinations...</p>
              ) : destinations.length === 0 ? (
                <p style={{ color: "#687386" }}>No destinations found.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {destinations.map((d) => (
                    <div
                      key={d.id}
                      style={{
                        padding: "16px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        background: "#fff",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <b style={{ fontSize: "15px", color: "#1e293b" }}>{d.country_name}</b>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: "6px",
                            background: d.is_published ? "#dcfce7" : "#f1f5f9",
                            color: d.is_published ? "#15803d" : "#64748b",
                          }}
                        >
                          {d.is_published ? "PUBLISHED" : "DRAFT"}
                        </span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#475569", margin: "10px 0" }}>{d.description}</p>
                      {d.image_url && (
                        <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "10px", wordBreak: "break-all" }}>
                          img: {d.image_url}
                        </div>
                      )}
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={() => handleEditDest(d)}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#0369a1",
                            background: "#e0f2fe",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleTogglePublishDest(d.id, d.is_published)}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: d.is_published ? "#b45309" : "#15803d",
                            background: d.is_published ? "#fef3c7" : "#dcfce7",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          {d.is_published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDeleteDest(d.id)}
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#b91c1c",
                            background: "#fee2e2",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form */}
            <div
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                height: "fit-content",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px", color: "#101722" }}>
                {editingDestId ? "Edit Destination" : "Add New Destination"}
              </h3>

              <form onSubmit={handleSaveDest}>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                    Country / Destination Name
                  </label>
                  <input
                    type="text"
                    required
                    value={destCountry}
                    onChange={(e) => setDestCountry(e.target.value)}
                    placeholder="e.g. New Zealand"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={destImg}
                    onChange={(e) => setDestImg(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ marginBottom: "18px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={destDesc}
                    onChange={(e) => setDestDesc(e.target.value)}
                    placeholder="Key benefits, study visa points, university opportunities..."
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "11px",
                      background: "linear-gradient(135deg, #0a192f, #1d4ed8)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(10, 25, 47, 0.2)",
                    }}
                  >
                    {editingDestId ? "Update Destination" : "Create Destination"}
                  </button>
                  {editingDestId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDestId(null);
                        setDestCountry("");
                        setDestDesc("");
                        setDestImg("");
                      }}
                      style={{
                        padding: "11px 16px",
                        background: "#f1f5f9",
                        color: "#475569",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
        {/* TAB 3: SUCCESS STORIES */}
        {activeTab === "stories" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "25px" }}>
            {/* List */}
            <div
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px", color: "#101722" }}>
                Success Story Images ({stories.length})
              </h3>

              {loading ? (
                <p style={{ color: "#687386" }}>Loading success stories...</p>
              ) : stories.length === 0 ? (
                <p style={{ color: "#687386" }}>
                  No custom success stories added yet. Showing default gallery on the homepage.
                </p>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {stories.map((st) => (
                    <div
                      key={st.id}
                      style={{
                        padding: "12px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        background: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "150px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          background: "#f1f5f9",
                        }}
                      >
                        <img
                          src={st.image_url}
                          alt={st.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <b style={{ fontSize: "14px", color: "#1e293b", display: "block" }}>{st.title}</b>
                          <small style={{ color: "#1d4ed8", fontWeight: 700 }}>{st.category}</small>
                        </div>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: "4px",
                            background: st.is_published ? "#dcfce7" : "#f1f5f9",
                            color: st.is_published ? "#15803d" : "#64748b",
                          }}
                        >
                          {st.is_published ? "ACTIVE" : "HIDDEN"}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                        <button
                          onClick={() => handleEditStory(st)}
                          style={{
                            flex: 1,
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#0369a1",
                            background: "#e0f2fe",
                            border: "none",
                            padding: "5px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleTogglePublishStory(st.id, st.is_published)}
                          style={{
                            flex: 1,
                            fontSize: "11px",
                            fontWeight: 600,
                            color: st.is_published ? "#b45309" : "#15803d",
                            background: st.is_published ? "#fef3c7" : "#dcfce7",
                            border: "none",
                            padding: "5px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          {st.is_published ? "Hide" : "Show"}
                        </button>
                        <button
                          onClick={() => handleDeleteStory(st.id)}
                          style={{
                            flex: 1,
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#b91c1c",
                            background: "#fee2e2",
                            border: "none",
                            padding: "5px",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form */}
            <div
              style={{
                background: "#ffffff",
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                height: "fit-content",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 16px", color: "#101722" }}>
                {editingStoryId ? "Edit Success Story" : "Add Success Story Image"}
              </h3>

              <form onSubmit={handleSaveStory}>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                    Student / Story Title
                  </label>
                  <input
                    type="text"
                    required
                    value={storyTitle}
                    onChange={(e) => setStoryTitle(e.target.value)}
                    placeholder="e.g. Visa Approval - Canada College"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                    Category / Country
                  </label>
                  <input
                    type="text"
                    required
                    value={storyCategory}
                    onChange={(e) => setStoryCategory(e.target.value)}
                    placeholder="e.g. Canada, UK, Australia, Student Visa"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                <div style={{ marginBottom: "18px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                    Success Story Image
                  </label>

                  {/* Upload from Device */}
                  <div
                    style={{
                      border: "2px dashed #cbd5e1",
                      borderRadius: "10px",
                      padding: "16px",
                      textAlign: "center",
                      background: "#f8fafc",
                      marginBottom: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="device-upload-input"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="device-upload-input"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>📁</span>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#0369a1" }}>
                        {uploadingImage ? "Processing Image..." : "Upload from Device"}
                      </span>
                      <small style={{ color: "#64748b", fontSize: "11px" }}>
                        Supports JPG, PNG, WEBP from your phone or computer
                      </small>
                    </label>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "10px 0" }}>
                    <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }}></div>
                    <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>OR PASTE URL</span>
                    <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }}></div>
                  </div>

                  <input
                    type="text"
                    required
                    value={storyImage}
                    onChange={(e) => setStoryImage(e.target.value)}
                    placeholder="https://example.com/visa-image.jpg"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                  />
                </div>

                {storyImage && (
                  <div style={{ marginBottom: "18px", textAlign: "center" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "6px" }}>Preview:</div>
                    <img
                      src={storyImage}
                      alt="Preview"
                      style={{ maxHeight: "160px", maxWidth: "100%", borderRadius: "8px", objectFit: "contain", border: "1px solid #e2e8f0" }}
                    />
                  </div>
                )}

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "11px",
                      background: "linear-gradient(135deg, #0a192f, #1d4ed8)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "13px",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(10, 25, 47, 0.2)",
                    }}
                  >
                    {editingStoryId ? "Update Story" : "Add to Success Stories"}
                  </button>
                  {editingStoryId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingStoryId(null);
                        setStoryTitle("");
                        setStoryCategory("Visa Success");
                        setStoryImage("");
                      }}
                      style={{
                        padding: "11px 16px",
                        background: "#f1f5f9",
                        color: "#475569",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
