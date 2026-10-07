import { useState } from "react";
import { useTranslation } from "react-i18next";

const SPEECH_LANG_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
};

export default function VoiceInput({ onResult, lang = "en" }) {
  const { t } = useTranslation();

  const [listening, setListening] = useState(false);
  const [unsupported, setUnsupported] = useState(false);

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setUnsupported(true);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = SPEECH_LANG_MAP[lang] || "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      if (text) {
        onResult(text);
      }
    };

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.start();
  }

  if (unsupported) {
    return (
      <span
        className="text-xs text-gray-400 px-2 self-center"
        title={t("assistant.voiceUnsupported")}
      >
        🎤 N/A
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={startListening}
      className={`px-4 rounded-lg border text-lg transition-colors ${
        listening
          ? "bg-red-50 border-red-300 animate-pulse"
          : "bg-gray-50 border-gray-300 hover:bg-gray-100"
      }`}
      aria-label={t("assistant.voiceSearch")}
      title={t("assistant.voiceSearch")}
    >
      {listening ? "🎙️" : "🎤"}
    </button>
  );
}
