import { initSockets } from "./initSockets";
import { roomSockets } from "./roomSockets";

export default function socketListeners(io: any, socket: any) {
    initSockets(io, socket);
    roomSockets(io, socket);
}