import mongoose from "mongoose";

export interface Sanction {
    guildId: string;
    memberId: string;
    type: string | 'ban' | 'kick' | 'warn' | 'mute';
    reason: string;
    issuedBy: string;
    registeredAt: number;
}

export default mongoose.model<Sanction & mongoose.Document>("Sanction", new mongoose.Schema<Sanction & mongoose.Document>({
    guildId: { type: String, required: true },
    memberId: { type: String, required: true },
    type: { type: String, required: true },
    reason: { type: String, required: true },
    issuedBy: { type: String, required: true },
    registeredAt: { type: Number, default: new Date().getTime() }
}));