import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            {t("footer.title")}
          </h3>

          <p className="text-sm mb-4">{t("footer.description")}</p>

          <div className="border-t border-gray-800 pt-4">
            <p className="text-xs">
              © {new Date().getFullYear()} {t("footer.title")}.{" "}
              {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
