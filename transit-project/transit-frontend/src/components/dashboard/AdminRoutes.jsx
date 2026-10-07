import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";

export default function AdminRoutes() {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    startPoint: "",
    endPoint: "",
    distanceKm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function refresh() {
    adminApi
      .listRoutes()
      .then((res) => setRoutes(res.data))
      .catch((err) => {
        console.error("Failed to load routes:", err);
        setError(
          "Could not load routes — check that you're logged in as ADMIN.",
        );
      });
  }

  useEffect(refresh, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminApi.createRoute({
        ...form,
        distanceKm: Number(form.distanceKm),
      });
      setForm({ name: "", startPoint: "", endPoint: "", distanceKm: "" });
      refresh();
    } catch (err) {
      console.error(
        "Failed to create route:",
        err.response?.data || err.message,
      );
      setError(
        err.response?.data?.message ||
          `Failed to add route (status ${err.response?.status || "unknown"}). Check the browser console for details.`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3"
      >
        <input
          className="input-field"
          placeholder="Route name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="input-field"
          placeholder="Start point"
          value={form.startPoint}
          onChange={(e) => setForm({ ...form, startPoint: e.target.value })}
          required
        />
        <input
          className="input-field"
          placeholder="End point"
          value={form.endPoint}
          onChange={(e) => setForm({ ...form, endPoint: e.target.value })}
          required
        />
        <input
          className="input-field"
          type="number"
          step="0.1"
          placeholder="Distance (km)"
          value={form.distanceKm}
          onChange={(e) => setForm({ ...form, distanceKm: e.target.value })}
          required
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Route"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {routes.map((r) => (
          <div key={r.id} className="card">
            <h4 className="font-semibold mb-1">{r.name}</h4>
            <p className="text-sm text-gray-500">
              {r.startPoint} → {r.endPoint}
            </p>
            <p className="text-sm text-brand-600 mt-1">{r.distanceKm} km</p>
          </div>
        ))}
        {routes.length === 0 && (
          <p className="text-gray-400 text-sm col-span-full text-center py-6">
            No routes yet.
          </p>
        )}
      </div>
    </div>
  );
}
