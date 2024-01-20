import { NextApiRequest } from "next";

import { getAuth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export const currentProfileProfile = async (req: NextApiRequest) => {
    const { userId } = await getAuth(req);
    if (!userId) throw new Error("Unauthorized");
    const profile = await db.profile.findFirst({
        where: {
            userId
        }
    })
    return profile;
}