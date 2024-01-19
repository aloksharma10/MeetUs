"use server"

import { revalidatePath } from "next/cache";
import { ChannelType, MemberType } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function createChannel({ name, type }: { name: string, type: string }, serverId: string) {
    try {
        const profile = await currentProfile();


        if (!profile) return "Unauthorized access";

        if (!serverId) return "Server ID missing";

        if (name === "general") return "Name cannot be 'general'";


        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        type: {
                            in: [MemberType.ADMIN, MemberType.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type: type as ChannelType,
                    }
                }
            }
        });

        return server;
    } catch (error) {
        console.log("CHANNELS_POST", error);
        return null
    }

}

export async function deleteChannel(channelId: string, serverId: string) {
    try {
        const profile = await currentProfile();

        if (!profile) return "Unauthorized access";

        if (!serverId) return "Server ID missing";

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        type: {
                            in: [MemberType.ADMIN, MemberType.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: channelId,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        });

        revalidatePath("/", "layout")

        return server;
    } catch (error) {
        console.log("CHANNELS_DELETE", error);
        return null
    }

}

export async function updateChannelInfo({ name, type }: { name: string, type: string }, serverId: string, channelId: string) {
    try {
        const profile = await currentProfile();

        if (!profile) return "Unauthorized access";

        if (!serverId) return "Server ID missing";

        if (name === "general") return "Name cannot be 'general'";

        if (!channelId) return "Channel ID missing";

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        type: {
                            in: [MemberType.ADMIN, MemberType.MODERATOR],
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: channelId,
                            NOT: {
                                name: "general",
                            },
                        },
                        data: {
                            name,
                            type,
                        }
                    }
                }
            }
        });

        return server
    } catch (error) {
        console.log("[CHANNEL_ID_PATCH]", error);
        return null
    }
}

