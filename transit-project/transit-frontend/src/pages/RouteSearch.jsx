import { useState } from "react";
import { useTranslation } from "react-i18next";
import { routeApi } from "../api/routeApi";

export default function RouteSearch() {
  const { t } = useTranslation();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [routes, setRoutes] = useState([]);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();

    const res = await routeApi.search(start, end);

    setRoutes(res.data);
    setSearched(true);
  }

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold mb-6">{t("routes.heading")}</h2>

      <form
        onSubmit={handleSearch}
        className="card flex flex-col sm:flex-row gap-3 mb-8"
      >
        <input
          className="input-field"
          placeholder={t("routes.fromPlaceholder")}
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <input
          className="input-field"
          placeholder={t("routes.toPlaceholder")}
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <button className="btn-primary whitespace-nowrap">
          {t("routes.searchButton")}
        </button>
      </form>

      {searched && routes.length === 0 && (
        <p className="text-gray-500 text-center">{t("routes.noRoutes")}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {routes.map((r) => (
          <div key={r.id} className="card">
            <h3 className="font-semibold mb-2">{r.name}</h3>

            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">{r.startPoint}</span>

              {" → "}

              <span className="font-medium text-gray-700">{r.endPoint}</span>
            </p>

            <p className="text-sm text-brand-600">
              {r.distanceKm} {t("routes.km")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
