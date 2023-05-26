import mongoose from "mongoose";

export interface Message {
    guildId: string;
    memberId: string;
    content: string;
    registeredAt: Date;
}

export default mongoose.model<Message & mongoose.Document>("Message", new mongoose.Schema<Message & mongoose.Document>({
    guildId: { type: String },
    memberId: { type: String },
    content: { type: String },
    registeredAt: { type: Date, default: Date.now() }
}));