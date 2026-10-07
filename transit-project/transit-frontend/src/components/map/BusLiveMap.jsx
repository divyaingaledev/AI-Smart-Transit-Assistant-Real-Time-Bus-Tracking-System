import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import L from "leaflet";

// Re-centers/fits the map whenever the bus position or route changes.
function FitBounds({ busPosition, routeCoords }) {
  const map = useMap();
  useEffect(() => {
    if (routeCoords.length > 0) {
      map.fitBounds(routeCoords, { padding: [30, 30] }); // zoom to show the whole route once known
    } else if (busPosition) {
      map.setView([busPosition.lat, busPosition.lng]);
    }
  }, [routeCoords, busPosition]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

// Different colored pin for start/end vs the live bus, so they're easy to tell apart on the map
function makeDivIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 0 1px ${color}"></div>`,
    iconSize: [14, 14],
  });
}
const startIcon = makeDivIcon("#16a34a"); // green = origin
const endIcon = makeDivIcon("#dc2626"); // red = destination

// Free geocoding via OpenStreetMap's Nominatim — turns a place name into lat/lng
async function geocode(place) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(place)}`,
  );
  const data = await res.json();
  if (!data[0]) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

// Free routing via the public OSRM demo server — turns two points into a road-following path
async function fetchRoutePath(from, to) {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`,
  );
  const data = await res.json();
  const coords = data.routes?.[0]?.geometry?.coordinates;
  if (!coords) return [];
  return coords.map(([lng, lat]) => [lat, lng]); // GeoJSON is [lng,lat] — Leaflet wants [lat,lng]
}

export default function BusLiveMap({
  busId,
  initialLat,
  initialLng,
  startPoint,
  endPoint,
}) {
  const [position, setPosition] = useState(
    initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null,
  );
  const [routeCoords, setRouteCoords] = useState([]);
  const [startCoord, setStartCoord] = useState(null);
  const [endCoord, setEndCoord] = useState(null);
  const stompRef = useRef(null);

  // Live bus position over WebSocket
  useEffect(() => {
    const socket = new SockJS("/ws");
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompRef.current = stompClient;

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/bus-location", (message) => {
        const update = JSON.parse(message.body);
        if (update.busId === busId) {
          setPosition({ lat: update.lat, lng: update.lng });
        }
      });
    });

    return () => {
      if (stompRef.current?.connected) {
        stompRef.current.disconnect();
      }
    };
  }, [busId]);

  // Draw the road route between the two named points (start/end strings from the schedule)
  useEffect(() => {
    if (!startPoint || !endPoint) return;

    let cancelled = false;
    (async () => {
      try {
        const [from, to] = await Promise.all([
          geocode(startPoint),
          geocode(endPoint),
        ]);
        if (cancelled || !from || !to) return;
        setStartCoord(from);
        setEndCoord(to);
        const path = await fetchRoutePath(from, to);
        if (!cancelled) setRouteCoords(path);
      } catch {
        // Route drawing is a visual nice-to-have — if geocoding/routing fails
        // (e.g. place name too vague, OSRM demo server rate-limited), the
        // live bus marker below still works fine without it.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [startPoint, endPoint]);

  if (!position && routeCoords.length === 0) {
    return (
      <div className="text-center text-gray-400 text-sm py-10 border border-dashed rounded-xl">
        Waiting for the driver to start this trip...
      </div>
    );
  }

  const center = position
    ? [position.lat, position.lng]
    : startCoord
      ? [startCoord.lat, startCoord.lng]
      : [18.52, 73.85];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: 380, width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds busPosition={position} routeCoords={routeCoords} />

      {routeCoords.length > 0 && (
        <Polyline
          positions={routeCoords}
          pathOptions={{ color: "#2563eb", weight: 5, opacity: 0.8 }}
        />
      )}

      {startCoord && (
        <Marker position={[startCoord.lat, startCoord.lng]} icon={startIcon}>
          <Popup>{startPoint}</Popup>
        </Marker>
      )}
      {endCoord && (
        <Marker position={[endCoord.lat, endCoord.lng]} icon={endIcon}>
          <Popup>{endPoint}</Popup>
        </Marker>
      )}

      {position && (
        <Marker position={[position.lat, position.lng]}>
          <Popup>Bus #{busId} — live location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
