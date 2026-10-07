import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Bus } from "lucide-react";
import axiosClient from "../api/axiosClient";
import { driverApi } from "../api/driverApi";

export default function DriverDashboard() {
  const { t } = useTranslation();

  const [profile, setProfile] = useState(null);
  const [bus, setBus] = useState(null);
  const [busError, setBusError] = useState("");
  const [tracking, setTracking] = useState(false);
  const [lastPos, setLastPos] = useState(null);

  const stompRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    axiosClient.get("/users/me").then((res) => setProfile(res.data));

    driverApi
      .myBus()
      .then((res) => setBus(res.data))
      .catch(() => setBusError(t("driverDashboard.noBus")));
  }, [t]);

  function startTracking() {
    if (!bus) return;

    const socket = new SockJS("/ws");
    const stompClient = Stomp.over(socket);

    stompClient.debug = null;
    stompRef.current = stompClient;

    stompClient.connect({}, () => {
      watchIdRef.current = navigator.geolocation.watchPosition((pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setLastPos(coords);

        stompClient.send(
          "/app/bus-location",
          {},
          JSON.stringify({
            busId: bus.id,
            ...coords,
          }),
        );
      });

      setTracking(true);
    });
  }

  function stopTracking() {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    stompRef.current?.disconnect();
    setTracking(false);
  }

  useEffect(() => {
    return () => stopTracking();
  }, []);

  return (
    <div className="page-container max-w-xl">
      <h2 className="text-2xl font-bold mb-1">
        {t("driverDashboard.welcome")}
        {profile ? `, ${profile.fullName}` : ""}
      </h2>

      <p className="text-gray-500 mb-6">{t("driverDashboard.description")}</p>

      <div className="card text-center">
        <div
          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            tracking ? "bg-green-100 animate-pulse" : "bg-brand-50"
          }`}
        >
          <Bus
            size={32}
            strokeWidth={1.75}
            className={tracking ? "text-green-600" : "text-brand-600"}
          />
        </div>

        {busError && <p className="text-sm text-red-600 mb-4">{busError}</p>}

        {bus && (
          <>
            <p className="font-medium mb-1">
              {tracking
                ? t("driverDashboard.tripInProgress")
                : t("driverDashboard.tripNotStarted")}
            </p>

            <p className="text-xs text-gray-400 mb-6">
              {t("driverDashboard.bus")} {bus.registrationNumber}{" "}
              {bus.route ? `— ${bus.route.name}` : ""}
            </p>

            {!tracking ? (
              <button
                className="btn-primary bg-green-600 hover:bg-green-700 w-full"
                onClick={startTracking}
              >
                ▶ {t("driverDashboard.startTrip")}
              </button>
            ) : (
              <button
                className="btn-primary bg-red-600 hover:bg-red-700 w-full"
                onClick={stopTracking}
              >
                ■ {t("driverDashboard.endTrip")}
              </button>
            )}

            {lastPos && (
              <p className="text-xs text-gray-400 mt-4">
                {t("driverDashboard.lastBroadcast")}: {lastPos.lat.toFixed(5)},{" "}
                {lastPos.lng.toFixed(5)}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
