"use server"

import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { MemberType } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface FormData {
    name: string;
    imgURL: string;
}

export async function createServer(formData: FormData) {
    try {
        const { name, imgURL } = formData;
        const profile = await currentProfile();
        if (!profile) throw new Error("Unauthorized");
        const server = await db.server.create({
            data: {
                name,
                imgURL,
                inviteCode: uuidv4(),
                profileId: profile.id,
                channels: {
                    create: [
                        {
                            name: "general",
                            profileId: profile.id,
                        }
                    ]
                },
                members: {
                    create: [
                        {
                            profileId: profile.id,
                            type: MemberType.ADMIN,
                            name: profile.name,
                        }
                    ]
                }
            }
        })
        return server;
    } catch (error) {
        console.log("[ERROR] createServer", error)
        return null;
    }
}

export async function updateServerInfo(serverId: string, formData: FormData) {
    try {
        const profile = await currentProfile();
        if (!profile) throw new Error("Unauthorized");

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                ...formData
            }
        })
        return server;
    } catch (error) {
        console.log("[ERROR] updateServerInfo", error)
        return null;
    }
}

export async function upadateServerInviteCode(serverId: string) {
    try {
        const profile = await currentProfile();
        if (!profile) throw new Error("Unauthorized");

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            },
            data: {
                inviteCode: uuidv4()
            }
        })
        return server;
    } catch (error) {
        console.log("[ERROR] upadateServerInviteCode", error)
        return null;
    }
}

export async function leaveServer(serverId: string) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return "Unauthorized"
        }

        if (!serverId) {
            return "Server ID missing"
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return server;
    } catch (error) {
        console.log("[SERVER_ID_LEAVE]", error);
        return null;
    }
}

export async function deleteServer(serverId: string) {
    try {
        const profile = await currentProfile();

        if (!profile) return "Unauthorized access";

        if (!serverId) return "Server ID missing";

        const server = await db.server.delete({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        type: {
                            in: [MemberType.ADMIN],
                        }
                    }
                }
            }
        });

        revalidatePath("/server", "layout")

        return server
    } catch (error) {
        console.log("[SERVER_DELETE]", error);
        return null
    }
}