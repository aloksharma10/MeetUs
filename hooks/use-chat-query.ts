import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import { getMessages } from "@/actions/messages";

interface ChatQueryProps {
    queryKey: string;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
};

export const useChatQuery = ({
    queryKey,
    paramKey,
    paramValue
}: ChatQueryProps) => {
    const { isConnected } = useSocket();

    const fetchMessages = async ({ pageParam = undefined }) => {

        const res = await getMessages({ cursor: pageParam, paramKey, paramValue });
        console.log("res", res)
        return res
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000,
        initialPageParam: undefined
    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    };
}