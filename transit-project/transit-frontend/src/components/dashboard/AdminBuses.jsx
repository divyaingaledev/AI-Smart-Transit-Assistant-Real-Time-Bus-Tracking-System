import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";

export default function AdminBuses() {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({ registrationNumber: "", routeId: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function refresh() {
    adminApi
      .listBuses()
      .then((res) => setBuses(res.data))
      .catch((err) => console.error("Failed to load buses:", err));
    adminApi
      .listRoutes()
      .then((res) => setRoutes(res.data))
      .catch((err) => console.error("Failed to load routes:", err));
  }

  useEffect(refresh, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminApi.createBus({ ...form, routeId: Number(form.routeId) });
      setForm({ registrationNumber: "", routeId: "" });
      refresh();
    } catch (err) {
      console.error("Failed to create bus:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          `Failed to add bus (status ${err.response?.status || "unknown"}). Check the browser console for details.`,
      );
    } finally {
      setLoading(false);
    }
  }

  const crowdColor = {
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-red-100 text-red-700",
    UNKNOWN: "bg-gray-100 text-gray-500",
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-3"
      >
        <input
          className="input-field"
          placeholder="Registration number (e.g. MH-12-AB-1234)"
          value={form.registrationNumber}
          onChange={(e) =>
            setForm({ ...form, registrationNumber: e.target.value })
          }
          required
        />
        <select
          className="input-field"
          value={form.routeId}
          onChange={(e) => setForm({ ...form, routeId: e.target.value })}
          required
        >
          <option value="">Select route</option>
          {routes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="btn-primary whitespace-nowrap"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Bus"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-2 font-medium">Reg. No.</th>
              <th className="px-4 py-2 font-medium">Route</th>
              <th className="px-4 py-2 font-medium">Driver</th>
              <th className="px-4 py-2 font-medium">Crowd</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {buses.map((b) => (
              <tr key={b.id}>
                <td className="px-4 py-2 font-medium">
                  {b.registrationNumber}
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {b.route?.name || "—"}
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {b.driver?.fullName || "Unassigned"}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${crowdColor[b.crowdLevel] || crowdColor.UNKNOWN}`}
                  >
                    {b.crowdLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {buses.length === 0 && (
          <p className="text-center text-gray-400 py-6 text-sm">
            No buses yet.
          </p>
        )}
      </div>
    </div>
  );
}
