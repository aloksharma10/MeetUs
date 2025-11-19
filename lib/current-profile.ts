import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db"

export const currentProfile = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const profile = await db.profile.findFirst({
        where: {
            userId
        }
    })
    return profile;
}