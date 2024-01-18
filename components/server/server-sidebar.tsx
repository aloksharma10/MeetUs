import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}
const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          type: "asc",
        },
      },
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/");

  const textChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId != profile.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.type;

  return (
    <div className="flex flex-col w-full h-full">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
