import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { trackVisitor, getStats } from '../utils/api';

const SocketContext = createContext(null);
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

function getOrCreateSessionId() {
  let id = sessionStorage.getItem('session_id');
  if (!id) { id = uuidv4(); sessionStorage.setItem('session_id', id); }
  return id;
}

export function SocketProvider({ children }) {
  const [activeUsers, setActiveUsers] = useState(1); // at minimum the current user is present
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [paidMembers, setPaidMembers] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();

    // 1. Track this visitor + get initial totals immediately (no waiting for socket heartbeat)
    trackVisitor(sessionId)
      .then((data) => {
        if (data.totalVisitors > 0) setTotalVisitors(data.totalVisitors);
        if (data.paidMembers >= 0) setPaidMembers(data.paidMembers);
      })
      .catch(() => {
        getStats().then((data) => {
          if (data.totalVisitors > 0) setTotalVisitors(data.totalVisitors);
          if (data.paidMembers >= 0) setPaidMembers(data.paidMembers);
        }).catch(() => {});
      });

    // 2. Socket for live active-user count + ongoing total updates
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
      if (typeof data.activeUsers === 'number') setActiveUsers(Math.max(1, data.activeUsers));
      if (data.totalVisitors > 0) setTotalVisitors(data.totalVisitors);
      if (data.paidMembers >= 0) setPaidMembers(data.paidMembers);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ activeUsers, totalVisitors, paidMembers, isConnected, socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
