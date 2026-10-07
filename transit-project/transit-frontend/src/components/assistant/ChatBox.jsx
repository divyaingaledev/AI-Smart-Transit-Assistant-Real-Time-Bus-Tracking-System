import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axiosClient from "../../api/axiosClient";
import VoiceInput from "./VoiceInput";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { from: "user", text }]);

    setInput("");
    setLoading(true);

    try {
      const res = await axiosClient.post(
        "/assistant/ask",
        {
          message: text,
          language: i18n.language,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: res.data,
        },
      ]);
    } catch (err) {
      console.error(
        "AI assistant request failed:",
        err.response?.data || err.message,
      );

      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: t("assistant.errorMessage"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="card max-w-2xl mx-auto !p-0 overflow-hidden flex flex-col"
      style={{ height: 480 }}
    >
      <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">
            {t("assistant.emptyState")}
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                m.from === "user"
                  ? "bg-brand-600 text-white rounded-br-sm"
                  : "bg-white border border-gray-200 rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-xs text-gray-400">{t("assistant.thinking")}</p>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-gray-100 p-3 flex gap-2 bg-white">
        <input
          className="input-field"
          placeholder={t("assistant.placeholder")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(input);
            }
          }}
        />

        <VoiceInput
          onResult={(text) => sendMessage(text)}
          lang={i18n.language}
        />

        <button
          className="btn-primary"
          onClick={() => sendMessage(input)}
          disabled={loading}
        >
          {loading ? t("assistant.thinking") : t("assistant.send")}
        </button>
      </div>
    </div>
  );
}
