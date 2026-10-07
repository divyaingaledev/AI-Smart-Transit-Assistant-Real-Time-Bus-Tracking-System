import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Bus,
  MapPinned,
  Clock,
  Bot,
  Mic,
  Users,
  Languages,
  ArrowRight,
} from "lucide-react";
import axiosClient from "../api/axiosClient";

export default function Home() {
  const [connected, setConnected] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    axiosClient
      .get("/health")
      .then(() => setConnected(true))
      .catch(() => setConnected(false));
  }, []);

  const features = [
    {
      icon: MapPinned,
      title: t("home.featureLiveTrackingTitle"),
      desc: t("home.featureLiveTrackingDesc"),
    },
    {
      icon: Clock,
      title: t("home.featureEtaTitle"),
      desc: t("home.featureEtaDesc"),
    },
    {
      icon: Bot,
      title: t("home.featureAiTitle"),
      desc: t("home.featureAiDesc"),
    },
    {
      icon: Mic,
      title: t("home.featureVoiceTitle"),
      desc: t("home.featureVoiceDesc"),
    },
    {
      icon: Users,
      title: t("home.featureCrowdTitle"),
      desc: t("home.featureCrowdDesc"),
    },
    {
      icon: Languages,
      title: t("home.featureLangTitle"),
      desc: t("home.featureLangDesc"),
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[650px] flex items-center text-white overflow-hidden">
        {/* Bus background photo */}
        <img
          src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=3000"
          alt="Modern city bus"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Brand-blue tint on top */}
        <div className="absolute inset-0 bg-brand-700/30" />

        {/* Hero content */}
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-6">
              <Bus size={48} strokeWidth={1.75} className="text-white" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight">
              {t("home.heroTitle")}
            </h1>

            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {t("home.heroSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/routes"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 hover:bg-brand-50 font-medium rounded-lg px-5 py-2.5 transition-colors shadow-lg"
              >
                {t("home.searchRoute")}
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/assistant"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium rounded-lg px-5 py-2.5 transition-colors"
              >
                <Bot size={16} />
                {t("home.askAssistant")}
              </Link>
            </div>

            {connected !== null && (
              <div className="flex items-center justify-center gap-2 mt-8 text-xs text-white/80">
                <span
                  className={`w-2 h-2 rounded-full ${
                    connected ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                {connected
                  ? t("home.backendConnected")
                  : t("home.backendNotReachable")}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="page-container">
        <h2 className="text-2xl font-bold text-center mb-10">
          {t("home.featuresHeading")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <Icon size={20} strokeWidth={2} />
              </div>

              <h3 className="font-semibold text-lg mb-1">{title}</h3>

              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
