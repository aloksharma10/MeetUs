"use client";
import { cn } from "@/lib/utils";
import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

export default function SocketIndicator() {
  const { isConnected } = useSocket();
  return <span className={cn("text-start", isConnected? "text-emerald-600": "text-red-600")}>{isConnected ? "Online" : "Offline"}</span>;
  
  //   return (
  //     <Badge
  //       variant="outline"
  //       className={cn(
  //         "text-white border-none text-xs font-semibold",
  //         isConnected ? "bg-emerald-600" : "bg-rose-600"
  //       )}
  //     >
  //       {isConnected ? "Live updates" : "Fallback: Polling every 1s"}
  //     </Badge>
  //   );
}
