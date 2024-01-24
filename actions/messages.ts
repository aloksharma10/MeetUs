"use server"

import { DirectMessage, Message } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const MESSAGES_BATCH = 10;

export async function getMessages({ cursor, paramKey, paramValue }: { cursor: string | undefined, paramKey: string, paramValue: string }) {
    try {
        const profile = await currentProfile();

        const channelId = paramKey === "channelId" ? paramValue : "";

        if (!profile) return "Unauthorized access";

        if (!channelId) return "channel ID missing";


        let messages: Message[] = [];

        if (cursor) {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
        } else {
            messages = await db.message.findMany({
                take: MESSAGES_BATCH,
                where: {
                    channelId,
                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            });
        }

        let nextCursor = null;

        if (messages.length === MESSAGES_BATCH) {
            nextCursor = messages[MESSAGES_BATCH - 1].id;
        }

        return ({
            items: messages,
            nextCursor
        });
    } catch (error) {
        console.log("[MESSAGES_GET]", error);
        return { error: "Internal server error", status: 500 };
    }
}

export async function directMessage({ cursor, paramKey, paramValue}: { cursor: string | undefined, paramKey: string, paramValue: string }){
    try {
        const profile = await currentProfile();
    
        const conversationId = paramKey === "conversationId" ? paramValue : "";
    
        if (!profile) return "Unauthorized access";

        if (!conversationId) return "conversation ID missing";
    
        let messages: DirectMessage[] = [];
    
        if (cursor) {
          messages = await db.directMessage.findMany({
            take: MESSAGES_BATCH,
            skip: 1,
            cursor: {
              id: cursor,
            },
            where: {
              conversationId,
            },
            include: {
              member: {
                include: {
                  profile: true,
                }
              }
            },
            orderBy: {
              createdAt: "desc",
            }
          })
        } else {
          messages = await db.directMessage.findMany({
            take: MESSAGES_BATCH,
            where: {
              conversationId,
            },
            include: {
              member: {
                include: {
                  profile: true,
                }
              }
            },
            orderBy: {
              createdAt: "desc",
            }
          });
        }
    
        let nextCursor = null;
    
        if (messages.length === MESSAGES_BATCH) {
          nextCursor = messages[MESSAGES_BATCH - 1].id;
        }
    
        return {
          items: messages,
          nextCursor
        }
      } catch (error) {
        console.log("[DIRECT_MESSAGES_GET]", error);
        return { error: "Internal server error", status: 500 };
      }
}