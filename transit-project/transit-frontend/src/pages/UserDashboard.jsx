import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosClient from "../api/axiosClient";
import FeedbackForm from "../components/dashboard/FeedbackForm";
import BusFinder from "../components/dashboard/BusFinder";

export default function UserDashboard() {
  const { t } = useTranslation();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axiosClient.get("/users/me").then((res) => setProfile(res.data));
  }, []);

  if (!profile) {
    return (
      <div className="page-container text-center text-gray-400">
        {t("userDashboard.loading")}
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold mb-1">
        {t("userDashboard.welcome")}, {profile.fullName}
      </h2>

      <p className="text-gray-500 mb-6">{t("userDashboard.description")}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-1 h-fit">
          <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xl font-bold mb-4">
            {profile.fullName?.[0] || "?"}
          </div>

          <h3 className="font-semibold text-lg">{profile.fullName}</h3>

          <p className="text-sm text-gray-500">{profile.email}</p>

          <span className="inline-block mt-3 text-xs font-medium bg-brand-50 text-brand-700 px-3 py-1 rounded-full">
            {profile.role}
          </span>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="font-semibold mb-4">{t("userDashboard.findBus")}</h3>

          <BusFinder />
        </div>
      </div>

      <div className="card mt-6">
        <h3 className="font-semibold mb-4">
          {t("userDashboard.sendFeedback")}
        </h3>

        <FeedbackForm />
      </div>
    </div>
  );
}
