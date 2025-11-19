import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

// Page throw an error if newly created user directly come with invite link!
// 14. Line: @ if (!profile) return redirectToSignIn();
export default async function InviteCodePage({
  params,
}: {
  params: { inviteCode: string };
}) {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  if (!params.inviteCode) return redirect("/");

  const existingServerUser = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServerUser) {
    return redirect(`/server/${existingServerUser.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
          name: profile.name,
        },
      },
    },
  });

  return redirect(`/server/${server.id}`);
}
