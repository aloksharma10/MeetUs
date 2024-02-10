import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import NavigationAction from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "@/components/navigation/navigation-item";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SocketIndicator from "../socket-indicator";
import { ModeToggle } from "../theme-toggle";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="space-y-3 flex flex-col w-full h-full py-3 px-2 bg-zinc-50 dark:bg-black">
      <Button
        variant={"primary"}
        size="default"
        className="h-14 justify-start "
      >
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[36px] w-[36px]",
            },
          }}
        />
        <div className="flex flex-col mx-3">
          <span className="font-semibold tracking-tight">{profile.name}</span>
          <SocketIndicator />
        </div>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </Button>

      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-20 mx-auto" />
      <ScrollArea className="w-full flex-1 gap-1 ">
        {servers.map((server) => (
          <div key={server.id} className="mb-1">
            <NavigationItem
              id={server.id}
              name={server.name}
              imgURL={server.imgURL}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default NavigationSidebar;
