"use client";

import { Channel, ChannelType, MemberType, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import ActionTooltip from "@/components/action-tooltip";
import { ModalType, useModal } from "@/hooks/use-model-store";
import { buttonVariants } from "../ui/button";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberType;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export default function ServerChannel({
  channel,
  server,
  role,
}: ServerChannelProps) {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/server/${params?.serverId}/channel/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group p-3 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id &&
          "bg-black hover:bg-zinc-700"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-zinc-100 dark:text-zinc-200 dark:group-hover:text-white group-hover:text-zinc-200"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberType.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => onAction(e, "editChannel")}
              className={cn(
                "hidden group-hover:block w-4 h-4 text-zinc-300 hover:text-zinc-200 transition",
                params?.channelId !== channel.id &&
                  "group-hover:text-zinc-700"
              )}
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, "deleteChannel")}
              className={cn("hidden group-hover:block w-4 h-4 text-zinc-300 hover:text-zinc-200 dark:text-zinc-400 dark:hover:text-zinc-300 transition", params?.channelId !== channel.id &&
              "group-hover:text-zinc-700"
          )}
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
}
