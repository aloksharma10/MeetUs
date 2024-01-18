import { redirect } from "next/navigation";

import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

import { currentProfile } from "@/lib/current-profile";
import ServerSidebar from "@/components/server/server-sidebar";

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect("/");

  return (
    <div className="h-full">
      <div className="hidden fixed md:w-[400px] md:flex bg-zinc-50 border-r z-20 flex-col inset-y-0 ">
       <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-[400px]">{children}</main>
    </div>
  );
}
