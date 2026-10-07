import { useTranslation } from "react-i18next";
import BusFinder from "../components/dashboard/BusFinder";

export default function LiveTracking() {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold mb-2">{t("tracking.heading")}</h2>

      <p className="text-gray-500 mb-6">{t("tracking.subheading")}</p>

      <div className="card">
        <BusFinder />
      </div>
    </div>
  );
}
