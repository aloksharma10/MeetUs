import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import ServerSidebar from "@/components/server/server-sidebar";

export const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 grid grid-cols-2 gap-1 w-full">
        <NavigationSidebar />
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};
