import { useState } from "react";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ROLE_ROUTES = {
  PASSENGER: "/dashboard",
  DRIVER: "/driver",
  ADMIN: "/admin",
};

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "PASSENGER",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authApi.register(form);
      login(res.data);
      navigate(ROLE_ROUTES[res.data.role] || "/");
    } catch {
      setError(
        t(
          "auth.registerFailed",
          "Could not register — email may already be in use",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="card w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-1 text-center">
          {t("auth.createAccount", "Create account")}
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          {t("auth.registerSubtitle", "Join as a passenger, driver, or admin")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="input-field"
            placeholder={t("auth.fullName", "Full name")}
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            required
          />
          <input
            className="input-field"
            type="email"
            placeholder={t("auth.email", "Email")}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder={t("auth.password", "Password")}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            required
          />

          <select
            className="input-field"
            value={form.role}
            onChange={(e) => update("role", e.target.value)}
          >
            <option value="PASSENGER">
              {t("auth.rolePassenger", "Passenger")}
            </option>
            <option value="DRIVER">{t("auth.roleDriver", "Driver")}</option>
            <option value="ADMIN">{t("auth.roleAdmin", "Admin")}</option>
          </select>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2"
          >
            {loading
              ? t("auth.creatingAccount", "Creating account...")
              : t("auth.register", "Register")}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          {t("auth.haveAccount", "Already have an account?")}{" "}
          <Link to="/login" className="text-brand-600 font-medium">
            {t("auth.logIn", "Log in")}
          </Link>
        </p>
      </div>
    </div>
  );
}
