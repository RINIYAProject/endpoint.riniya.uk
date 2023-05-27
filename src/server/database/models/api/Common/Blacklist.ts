import mongoose from "mongoose";

export interface IBlacklist {
    userId: string;
    caseId: string;
    reason: string;
    issuedBy: string;
    registeredAt: Date;
}

export default mongoose.model<IBlacklist & mongoose.Document>("Blacklist", new mongoose.Schema<IBlacklist & mongoose.Document>({
    userId: { type: String, unique: true, required: true },
    reason: { type: String, required: true },
    issuedBy: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now() }
}));