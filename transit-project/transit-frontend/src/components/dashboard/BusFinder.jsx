import { useState } from "react";
import { useTranslation } from "react-i18next";
import { scheduleApi } from "../../api/scheduleApi";
import BusLiveMap from "../map/BusLiveMap";

export default function BusFinder() {
  const { t } = useTranslation();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();

    setSelected(null);

    const res = await scheduleApi.search(start, end);

    setSchedules(res.data);
    setSearched(true);
  }

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <input
          className="input-field"
          placeholder={t("tracking.fromPlaceholder")}
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <input
          className="input-field"
          placeholder={t("tracking.toPlaceholder")}
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <button className="btn-primary whitespace-nowrap">
          {t("tracking.searchButton")}
        </button>
      </form>

      {searched && schedules.length === 0 && (
        <p className="text-gray-400 text-sm text-center py-4">
          {t("tracking.noBuses")}
        </p>
      )}

      {schedules.length > 0 && (
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-2 font-medium">{t("tracking.route")}</th>

                <th className="px-4 py-2 font-medium">{t("tracking.bus")}</th>

                <th className="px-4 py-2 font-medium">
                  {t("tracking.departure")}
                </th>

                <th className="px-4 py-2 font-medium">
                  {t("tracking.arrival")}
                </th>

                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {schedules.map((s) => (
                <tr
                  key={s.id}
                  className={selected?.id === s.id ? "bg-brand-50" : ""}
                >
                  <td className="px-4 py-2">{s.route.name}</td>

                  <td className="px-4 py-2">{s.bus.registrationNumber}</td>

                  <td className="px-4 py-2">{s.departureTime}</td>

                  <td className="px-4 py-2">{s.arrivalTime}</td>

                  <td className="px-4 py-2">
                    <button
                      className="text-brand-600 font-medium text-sm hover:underline"
                      onClick={() => setSelected(s)}
                    >
                      {t("tracking.trackLive")} →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div>
          <h4 className="font-semibold mb-2">
            {t("tracking.liveLocation")} — {selected.bus.registrationNumber} (
            {selected.route.name})
          </h4>

          <BusLiveMap
            busId={selected.bus.id}
            initialLat={selected.bus.currentLat}
            initialLng={selected.bus.currentLng}
            startPoint={selected.route.startPoint}
            endPoint={selected.route.endPoint}
          />
        </div>
      )}
    </div>
  );
}
