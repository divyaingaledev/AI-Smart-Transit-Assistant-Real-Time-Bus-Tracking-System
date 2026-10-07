import { useState } from "react";
import { useTranslation } from "react-i18next";
import axiosClient from "../../api/axiosClient";

export default function FeedbackForm() {
  const { t } = useTranslation();

  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosClient.post("/feedback", { message });
      setResult(res.data);
      setMessage("");
    } catch (err) {
      console.error(
        "Failed to submit feedback:",
        err.response?.data || err.message,
      );

      setError(
        err.response?.data?.message ||
          t("feedback.submitError", {
            status: err.response?.status || "unknown",
          }),
      );
    } finally {
      setLoading(false);
    }
  }

  const sentimentColor = {
    POSITIVE: "bg-green-100 text-green-700",
    NEGATIVE: "bg-red-100 text-red-700",
    NEUTRAL: "bg-gray-100 text-gray-700",
    UNTAGGED: "bg-gray-100 text-gray-500",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        className="input-field min-h-[100px] resize-none"
        placeholder={t("feedback.placeholder")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button
        type="submit"
        className="btn-primary self-start"
        disabled={loading}
      >
        {loading ? t("feedback.submitting") : t("feedback.submit")}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result && (
        <p className="text-sm text-gray-500">
          {t("feedback.submitted")}

          {result.sentiment && result.sentiment !== "UNTAGGED"
            ? ` — ${t("feedback.sentiment")}: `
            : "."}

          {result.sentiment && result.sentiment !== "UNTAGGED" && (
            <span
              className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                sentimentColor[result.sentiment] || "bg-gray-100"
              }`}
            >
              {result.sentiment}
            </span>
          )}
        </p>
      )}
    </form>
  );
}
