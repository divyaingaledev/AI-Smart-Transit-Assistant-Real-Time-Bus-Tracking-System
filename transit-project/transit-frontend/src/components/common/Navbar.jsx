import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // Handle logout.
  function handleLogout() {
    logout();
    navigate("/login");
    setOpen(false);
  }

  // Handle language change.
  function handleLanguageChange(event) {
    const language = event.target.value;

    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }

  // Create navigation links.
  const links = [
    {
      to: "/",
      label: t("nav.home"),
    },
    {
      to: "/routes",
      label: t("nav.routes"),
    },
    {
      to: "/tracking",
      label: t("nav.tracking"),
    },
    {
      to: "/assistant",
      label: t("nav.assistant"),
    },
  ];

  // Add passenger link.
  if (user?.role === "PASSENGER") {
    links.push({
      to: "/dashboard",
      label: t("nav.dashboard"),
    });
  }

  // Add driver link.
  if (user?.role === "DRIVER") {
    links.push({
      to: "/driver",
      label: t("nav.driver"),
    });
  }

  // Add admin link.
  if (user?.role === "ADMIN") {
    links.push({
      to: "/admin",
      label: t("nav.admin"),
    });
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo. */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg text-brand-700"
        >
          <span className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
            <Bus size={18} strokeWidth={2} />
          </span>

          {t("app.title")}
        </Link>

        {/* Desktop navigation. */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-brand-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions. */}
        <div className="hidden md:flex items-center gap-3">
          {/* Desktop language selector. */}
          <select
            value={i18n.language}
            onChange={handleLanguageChange}
            className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white cursor-pointer"
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>

          {/* Login or logout button. */}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn-secondary text-sm !px-4 !py-2"
            >
              {t("nav.logout")}
            </button>
          ) : (
            <Link to="/login" className="btn-primary text-sm !px-4 !py-2">
              {t("nav.login")}
            </Link>
          )}
        </div>

        {/* Mobile menu button. */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu. */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 flex flex-col gap-3">
          {/* Mobile navigation links. */}
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="py-1.5 text-gray-700 hover:text-brand-600"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile actions. */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            {/* Mobile language selector. */}
            <select
              value={i18n.language}
              onChange={handleLanguageChange}
              className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white"
              aria-label="Select language"
            >
              <option value="en">EN</option>
              <option value="hi">हिं</option>
              <option value="mr">मर</option>
            </select>

            {/* Mobile login or logout button. */}
            {user ? (
              <button onClick={handleLogout} className="btn-secondary text-sm">
                {t("nav.logout")}
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="btn-primary text-sm"
              >
                {t("nav.login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
