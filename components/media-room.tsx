"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  LiveKitRoom,
  VideoConference,
  useChat,
} from "@livekit/components-react";
import "@livekit/components-styles";

import { useUser } from "@clerk/nextjs";
import { Loader, Loader2, Pen } from "lucide-react";

import ActionTooltip from "./action-tooltip";
import { useRouter } from "next/navigation";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser();
  const [token, setToken] = useState("");

  
  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;

    const name = `${user.firstName} ${user.lastName}`;

    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();

    console.log("chatId", chatId, "name", name)
  }, [user?.firstName, user?.lastName, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100dvh' }}
      video={video}
      audio={audio}
    >
      <VideoConference />
      <SendMessage />
    </LiveKitRoom>
  );
};

export const SendMessage = () => {
  const { send, isSending } = useChat();
const router = useRouter();
  const onClick = async () => {
    console.log("clicked");
    router.push(`${process.env.NEXT_PUBLIC_SITE_URL!}/board/${uuidv4()}`)
    // if (send && !isSending)
      // await send(``);
  };
  return (
    <ActionTooltip side="left" align="center" label="Collaborate workspace">
      <div className="absolute top-3 right-3 bg-yellow-500 p-3 rounded-md ">
        {isSending ? (
          <Loader size={18} />
        ) : (
          <Pen size={18} aria-disabled={isSending} onClick={onClick} />
        )}
      </div>
    </ActionTooltip>
  );
};
