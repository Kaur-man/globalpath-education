"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, PhoneCall } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
  time: string;
}

const QUICK_ACTIONS = [
  "Study in Canada 🇨🇦",
  "Study in UK / Australia 🇦🇺",
  "Free Visa Evaluation 🎓",
  "Talk to Counsellor 📞",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! Welcome to Global Expert Immigration Consultants. How can we assist you with your visa or study abroad plans today?",
      time: "Just now",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Simulate smart bot response
    setTimeout(() => {
      let reply = "Thank you for reaching out! Our senior immigration counsellors are available to assist you. Call us directly at 7404040813 / 8708715777 or leave your details below.";
      
      const lower = text.toLowerCase();
      if (lower.includes("canada")) {
        reply = "Canada is a top destination! We assist with SDS student visas, spouse open work permits, and PGWP pathways. Would you like to schedule a free 1-on-1 profile evaluation?";
      } else if (lower.includes("uk") || lower.includes("australia")) {
        reply = "We offer complete end-to-end processing for top universities in the UK and Australia, including scholarship guidance and offer letters. Call us at 7404040813 to fast-track your application!";
      } else if (lower.includes("evaluation") || lower.includes("free")) {
        reply = "We provide a 100% Free Profile Evaluation! Please fill in our consultation form on the website or WhatsApp our experts at +91 7404040813.";
      } else if (lower.includes("talk") || lower.includes("counsellor") || lower.includes("phone") || lower.includes("call")) {
        reply = "You can speak directly with our head counsellor right now at +91 7404040813 or 8708715777 (Mon-Sat, 9:00 AM – 6:00 PM).";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        className="ge-chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat with immigration expert"}
        title="Chat with Global Expert"
      >
        <span className="ge-chatbot-fab-pulse"></span>
        {isOpen ? <X size={26} color="#ffffff" /> : <MessageSquare size={26} color="#ffffff" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ge-chat-modal" role="dialog" aria-label="Visa Assistant Chat">
          {/* Header */}
          <div className="ge-chat-header">
            <div className="ge-chat-avatar">
              <Bot size={22} color="#ffffff" />
              <span className="ge-chat-online-dot"></span>
            </div>
            <div className="ge-chat-header-info">
              <h4>Global Expert Visa Assistant</h4>
              <p><span>●</span> Active Now | Mon–Sat</p>
            </div>
            <button
              type="button"
              className="ge-chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat window"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Notice */}
          <div className="ge-chat-notice">
            <Sparkles size={14} />
            <span>Fast-track your Canada, UK, Australia & Europe Visas</span>
          </div>

          {/* Body / Messages */}
          <div className="ge-chat-body">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`ge-chat-message ${m.sender === "bot" ? "bot" : "user"}`}
              >
                {m.sender === "bot" ? (
                  <div className="ge-msg-avatar">
                    <Bot size={15} />
                  </div>
                ) : (
                  <div className="ge-msg-avatar user-icon">
                    <User size={15} />
                  </div>
                )}
                <div className="ge-msg-content">
                  <div className="ge-msg-bubble">{m.text}</div>
                  <span className="ge-msg-time">{m.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestions */}
          <div className="ge-chat-suggestions">
            {QUICK_ACTIONS.map((action, i) => (
              <button
                key={i}
                type="button"
                className="ge-chat-chip"
                onClick={() => handleSend(action)}
              >
                {action}
              </button>
            ))}
          </div>

          {/* Direct Call Strip */}
          <div className="ge-chat-call-strip">
            <PhoneCall size={14} />
            <span>Need urgent help? Call <a href="tel:7404040813">7404040813</a></span>
          </div>

          {/* Input Footer */}
          <form
            className="ge-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about study visa, requirements..."
              className="ge-chat-input"
            />
            <button
              type="submit"
              className="ge-chat-send-btn"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
