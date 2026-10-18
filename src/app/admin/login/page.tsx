"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data.session) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "18px",
          padding: "36px",
          boxShadow: "0 10px 35px rgba(10, 25, 47, 0.08)",
          border: "1px solid rgba(15, 43, 92, 0.14)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <img
            src="/logo.png"
            alt="Global Expert Immigration"
            style={{
              width: "56px",
              height: "56px",
              objectFit: "contain",
              borderRadius: "12px",
              background: "#ffffff",
              padding: "4px",
              boxShadow: "0 4px 16px rgba(10, 25, 47, 0.12)",
              border: "1px solid rgba(15, 43, 92, 0.15)",
              display: "inline-block",
              marginBottom: "12px",
            }}
          />
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#101722",
              margin: "0 0 6px",
            }}
          >
            Admin Portal
          </h1>
          <p style={{ fontSize: "13px", color: "#687386", margin: 0 }}>
            Sign in to manage Global Expert Immigration content
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: "12px 16px",
              marginBottom: "20px",
              background: "#fff0f1",
              border: "1px solid #fecdd3",
              borderRadius: "10px",
              color: "#b91c1c",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@globalexpertimmigration.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                outline: "none",
                background: "#ffffff",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                outline: "none",
                background: "#ffffff",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: loading ? "#9ca3af" : "linear-gradient(135deg, #0a192f 0%, #1d4ed8 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.2s ease",
              boxShadow: "0 4px 15px rgba(10, 25, 47, 0.25)",
            }}
          >
            {loading ? "Signing In..." : "Sign In to Dashboard →"}
          </button>
        </form>
      </div>
    </div>
  );
}
