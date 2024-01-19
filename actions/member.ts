"use server"

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberType } from "@prisma/client";

export async function handleMemberType(memberId: string, serverId: string, type: MemberType) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return { status: 401, message: "Unauthorized access" }
        }

        if (!serverId) {
            return { status: 400, message: "Server ID missing" }
        }

        if (!memberId) {
            return { status: 400, message: "Member ID missing" }
        }


        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: memberId,
                            profileId: {
                                not: profile.id
                            }
                        },
                        data: {
                            type
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        type: "asc"
                    }
                }
            }
        });

        return server;
    } catch (error) {
        console.log("[ERROR] handleMemberType", error)
        return { error: "Internal server error", status: 500 };
    }
}

export async function deleteMember(memberId: string, serverId: string) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return { status: 401, message: "Unauthorized access" }
        }

        if (!serverId) {
            return { status: 400, message: "Server ID missing" }
        }

        if (!memberId) {
            return { status: 400, message: "Member ID missing" }
        }


        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: memberId,
                        profileId: {
                            not: profile.id
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        type: "asc"
                    }
                }
            }
        });
        return server;
    } catch (error) {
        console.log("[ERROR] handleMemberType", error)
        return { error: "Internal server error", status: 500 };
    }
}

