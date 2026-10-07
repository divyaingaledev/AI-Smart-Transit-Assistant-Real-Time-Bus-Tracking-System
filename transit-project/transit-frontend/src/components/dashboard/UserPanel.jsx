import { useTranslation } from "react-i18next";

export default function UserPanel() {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold mb-2">{t("userPanel.title")}</h2>

      <p className="text-gray-500">{t("userPanel.description")}</p>
    </div>
  );
}
