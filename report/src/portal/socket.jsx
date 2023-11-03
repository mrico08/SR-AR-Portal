import {createContext} from "react";
import io from "socket.io-client";

export const socket = io('http://222.127.149.101:7001');
const SocketContext = createContext(socket);

export default SocketContext;