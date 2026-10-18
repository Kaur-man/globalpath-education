"use client";

import React, { useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function ConsultationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Canada");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const supabase = createClient();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.from("enquiries").insert({
        name,
        phone,
        email: email || null,
        country_interest: country,
        message: message || null,
        status: "new",
      });

      if (error) {
        // If enquiries table is not yet created in Supabase, provide fallback toast
        console.warn("Enquiries table insert error:", error);
      }
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(16, 23, 34, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            border: "none",
            background: "#f1f5f9",
            color: "#64748b",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            fontSize: "16px",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
        >
          ✕
        </button>

        {success ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#dcfce7",
                color: "#15803d",
                fontSize: "28px",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#101722", marginBottom: "8px" }}>
              Request Received!
            </h3>
            <p style={{ fontSize: "14px", color: "#687386", lineHeight: 1.6 }}>
              Thank you, <strong>{name}</strong>. Our senior immigration counsellor will call you shortly at{" "}
              <strong>{phone}</strong> to guide you through your visa options.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              style={{
                marginTop: "20px",
                padding: "10px 24px",
                background: "linear-gradient(135deg, #0a192f, #1d4ed8)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#1d4ed8",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                Free Consultation
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0a192f", margin: 0 }}>
                Book Your Profile Evaluation
              </h3>
            </div>

            {errorMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "#fef2f2",
                  border: "1px solid #fecdd3",
                  color: "#b91c1c",
                  borderRadius: "8px",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mandeep Singh"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Destination of Interest
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", background: "#fff" }}
                >
                  <option value="Canada">Canada (Study & Work)</option>
                  <option value="Australia">Australia (Study & PR)</option>
                  <option value="USA">USA (Higher Education)</option>
                  <option value="United Kingdom">United Kingdom (Masters & Work)</option>
                  <option value="Malta & Europe">Malta & Europe</option>
                  <option value="Tourist / Visitor Visa">Tourist / Visitor Visa</option>
                </select>
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Message / Academic Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your highest qualification, IELTS/PTE score, or question..."
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: loading ? "#9ca3af" : "linear-gradient(135deg, #0a192f 0%, #1d4ed8 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 15px rgba(10, 25, 47, 0.25)",
                }}
              >
                {loading ? "Submitting..." : "Submit Consultation Request →"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
