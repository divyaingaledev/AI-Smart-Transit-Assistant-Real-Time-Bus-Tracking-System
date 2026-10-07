import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";

export default function AdminSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [form, setForm] = useState({
    routeId: "",
    busId: "",
    departureTime: "",
    arrivalTime: "",
  });

  function refresh() {
    adminApi.listSchedules().then((res) => setSchedules(res.data));
    adminApi.listRoutes().then((res) => setRoutes(res.data));
    adminApi.listBuses().then((res) => setBuses(res.data));
  }

  useEffect(refresh, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await adminApi.createSchedule({
      routeId: Number(form.routeId),
      busId: Number(form.busId),
      departureTime: form.departureTime, // "HH:mm" string, Spring parses it into LocalTime
      arrivalTime: form.arrivalTime,
    });
    setForm({ routeId: "", busId: "", departureTime: "", arrivalTime: "" });
    refresh();
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6"
      >
        <select
          className="input-field"
          value={form.routeId}
          onChange={(e) => setForm({ ...form, routeId: e.target.value })}
          required
        >
          <option value="">Route</option>
          {routes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <select
          className="input-field"
          value={form.busId}
          onChange={(e) => setForm({ ...form, busId: e.target.value })}
          required
        >
          <option value="">Bus</option>
          {buses.map((b) => (
            <option key={b.id} value={b.id}>
              {b.registrationNumber}
            </option>
          ))}
        </select>
        <input
          className="input-field"
          type="time"
          value={form.departureTime}
          onChange={(e) => setForm({ ...form, departureTime: e.target.value })}
          required
        />
        <input
          className="input-field"
          type="time"
          value={form.arrivalTime}
          onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
          required
        />
        <button className="btn-primary">Add Timing</button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-2 font-medium">Route</th>
              <th className="px-4 py-2 font-medium">Bus</th>
              <th className="px-4 py-2 font-medium">Departure</th>
              <th className="px-4 py-2 font-medium">Arrival</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {schedules.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-2">{s.route.name}</td>
                <td className="px-4 py-2">{s.bus.registrationNumber}</td>
                <td className="px-4 py-2">{s.departureTime}</td>
                <td className="px-4 py-2">{s.arrivalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {schedules.length === 0 && (
          <p className="text-center text-gray-400 py-6 text-sm">
            No schedules yet.
          </p>
        )}
      </div>
    </div>
  );
}
