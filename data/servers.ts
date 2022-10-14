import { Server } from "./models/Server";

export async function getServerData(id: string) {
    return await Server.findOne({ serverId: id }) || await new Server({ serverId: id }).save();;
}

export async function getTotalServers() {
    return await Server.find({ });
}