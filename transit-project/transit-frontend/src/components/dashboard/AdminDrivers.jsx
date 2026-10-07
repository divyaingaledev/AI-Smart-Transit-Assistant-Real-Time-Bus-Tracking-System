import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [form, setForm] = useState({ busId: "", driverId: "" });
  const [message, setMessage] = useState("");

  function refresh() {
    adminApi.listDrivers().then((res) => setDrivers(res.data));
    adminApi.listBuses().then((res) => setBuses(res.data));
  }

  useEffect(refresh, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    try {
      await adminApi.assignDriver({
        busId: Number(form.busId),
        driverId: Number(form.driverId),
      });
      setMessage("Driver assigned successfully.");
      setForm({ busId: "", driverId: "" });
      refresh();
    } catch {
      setMessage("Could not assign driver.");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-4"
      >
        <select
          className="input-field"
          value={form.busId}
          onChange={(e) => setForm({ ...form, busId: e.target.value })}
          required
        >
          <option value="">Select bus</option>
          {buses.map((b) => (
            <option key={b.id} value={b.id}>
              {b.registrationNumber}
            </option>
          ))}
        </select>
        <select
          className="input-field"
          value={form.driverId}
          onChange={(e) => setForm({ ...form, driverId: e.target.value })}
          required
        >
          <option value="">Select driver</option>
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.fullName} ({d.email})
            </option>
          ))}
        </select>
        <button className="btn-primary whitespace-nowrap">Assign</button>
      </form>

      {message && <p className="text-sm text-gray-500 mb-6">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {buses.map((b) => (
          <div
            key={b.id}
            className="card !p-4 flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{b.registrationNumber}</p>
              <p className="text-sm text-gray-500">
                {b.route?.name || "No route"}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${b.driver ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
            >
              {b.driver?.fullName || "Unassigned"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
