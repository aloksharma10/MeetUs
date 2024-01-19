import { NextApiRequest } from 'next';
import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { NextAPIResponseServerInfo } from '@/types';

export const config = {
    api: { bodyParser: false }
}

const ioHandler = (req: NextApiRequest, res: NextAPIResponseServerInfo) => {
    if (!res.socket.server.io) {
        const api = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new SocketIOServer(httpServer, {
            path: api,
            addTrailingSlash: false
        })
        res.socket.server.io = io;
    }
    res.end();
}

export default ioHandler;