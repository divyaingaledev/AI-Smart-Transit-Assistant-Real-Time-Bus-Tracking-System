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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      login(res.data);
      navigate(ROLE_ROUTES[res.data.role] || "/");
    } catch {
      setError(t("auth.invalidCredentials", "Invalid email or password"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="card w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-1 text-center">{t("auth.welcomeBack", "Welcome back")}</h2>
        <p className="text-gray-500 text-sm text-center mb-6">{t("auth.loginSubtitle", "Log in to continue your journey")}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t("auth.email", "Email")}</label>
            <input
              className="input-field"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">{t("auth.password", "Password")}</label>
            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? t("auth.loggingIn", "Logging in...") : t("auth.logIn", "Log In")}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          {t("auth.noAccount", "No account?")}{" "}
          <Link to="/register" className="text-brand-600 font-medium">{t("auth.registerHere", "Register here")}</Link>
        </p>
      </div>
    </div>
  );
}