"use client";

import { Member, MemberType, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberType.GUEST]: null,
  [MemberType.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  [MemberType.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
}

export default function ServerMember  ({
  member,
  server
}: ServerMemberProps)  {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.type];

  const onClick = () => {
    router.push(`/server/${params?.serverId}/conversations/${member.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10  dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-black hover:bg-zinc-700 dark:bg-zinc-700"
      )}
    >
      <UserAvatar 
        src={member.profile.imgURL}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-xs lg:text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-300 dark:group-hover:text-zinc-300 transition whitespace-nowrap text-ellipsis",
          params?.memberId === member.id && "text-zinc-300 dark:text-zinc-200 group-hover:text-zinc-200 "
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  )
}