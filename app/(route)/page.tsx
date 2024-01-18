import { ModeToggle } from "@/components/theme-toggle";
import InitialUser from "@/lib/initial-user";
import { UserButton } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import InitialModel from "@/components/model/iniital-model";

export default async function HomePage() {
  const profile = await InitialUser();

  const server = await db.server.findFirst({
    where:{
      members: {
        some: {
            profileId: profile?.id ?? ''
        }
      }
    }
  })

  if(server) {
    return redirect(`/server/${server.id}`)
  }
  
  return (
    <InitialModel/>
  );
}
