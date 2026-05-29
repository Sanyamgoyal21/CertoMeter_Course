import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const SocketContext = createContext(null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

function getOrCreateSessionId() {
  let id = sessionStorage.getItem('session_id');
  if (!id) {
    id = uuidv4();
    sessionStorage.setItem('session_id', id);
  }
  return id;
}

export function SocketProvider({ children }) {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [totalVisitors, setTotalVisitors] = useState(52381);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();

    const socket = io(SOCKET_URL, {
      query: { sessionId },
      transports: ['websocket', 'polling'],
      timeout: 5000,
      reconnectionAttempts: 3,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('stats:update', (data) => {
      if (data.activeUsers > 0) setActiveUsers(data.activeUsers);
      if (data.totalVisitors > 0) setTotalVisitors(data.totalVisitors);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ activeUsers, totalVisitors, isConnected, socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
