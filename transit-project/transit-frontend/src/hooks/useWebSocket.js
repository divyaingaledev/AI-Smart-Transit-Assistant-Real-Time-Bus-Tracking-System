import { useEffect, useRef } from "react";

// TODO: connect to backend STOMP/WebSocket endpoint, subscribe to topics.
export function useWebSocket(url, onMessage) {
  const clientRef = useRef(null);

  useEffect(() => {
    // TODO: implement connection lifecycle
    return () => {
      // TODO: cleanup
    };
  }, [url]);

  return clientRef;
}
