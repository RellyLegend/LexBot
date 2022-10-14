import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    userId: { type: String, required: true },
    wallet: { type: Number, required: false, default: 100 },
    bank: { type: Number, required: false, default: 0 },
});

export const User = model('User', UserSchema);