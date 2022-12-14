import { Schema, model } from "mongoose";

const ServerSchema = new Schema({
    serverId: { type: String, required: true },
    prefix: { type: String, required: false, default: "." },
});

export const Server = model('Server', ServerSchema);