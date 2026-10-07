import { useTranslation } from "react-i18next";
import ChatBox from "../components/assistant/ChatBox";

export default function Assistant() {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold mb-2">{t("assistant.heading")}</h2>
      <p className="text-gray-500 mb-6">{t("assistant.subheading")}</p>
      <ChatBox />
    </div>
  );
}
