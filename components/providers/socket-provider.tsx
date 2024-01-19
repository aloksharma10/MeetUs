"use client";

import { io as ClientIO } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface SocketProviderProps {
  socket: any | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketProviderProps>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_API_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });
    setSocket(socket);
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
