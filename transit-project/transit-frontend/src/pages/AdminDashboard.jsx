import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosClient from "../api/axiosClient";
import AdminBuses from "../components/dashboard/AdminBuses";
import AdminRoutes from "../components/dashboard/AdminRoutes";
import AdminSchedules from "../components/dashboard/AdminSchedules";
import AdminDrivers from "../components/dashboard/AdminDrivers";

const TABS = [
  { key: "buses", label: "buses" },
  { key: "routes", label: "routes" },
  { key: "schedules", label: "schedules" },
  { key: "drivers", label: "drivers" },
];

export default function AdminDashboard() {
  const { t } = useTranslation();

  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState("buses");

  useEffect(() => {
    axiosClient.get("/users/me").then((res) => setProfile(res.data));
  }, []);

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold mb-1">
        {t("adminDashboard.welcome")}
        {profile ? `, ${profile.fullName}` : ""}
      </h2>

      <p className="text-gray-500 mb-6">{t("adminDashboard.description")}</p>

      <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
        {TABS.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              tab === item.key
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t(`adminDashboard.tabs.${item.label}`)}
          </button>
        ))}
      </div>

      <div className="card">
        {tab === "buses" && <AdminBuses />}
        {tab === "routes" && <AdminRoutes />}
        {tab === "schedules" && <AdminSchedules />}
        {tab === "drivers" && <AdminDrivers />}
      </div>
    </div>
  );
}
