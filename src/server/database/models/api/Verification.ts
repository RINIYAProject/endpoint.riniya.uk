/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Verification.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alle.roy <alle.roy.student@42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 23:34:39 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/06 05:46:37 by alle.roy         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from "mongoose";

export declare type Answer = {
    title: string;
    content: string;
}

export interface Verification {
    guildId: string;
    memberId: string;
    memberName?: string;
    issuerId?: string;
    issuerName?: string;
    status?: string ;
    answers?: Answer;
    registeredAt: number;
    updatedAt?: number;
    expireAt?: number;
}

export default mongoose.model<Verification & mongoose.Document>("Verification", new mongoose.Schema<Verification & mongoose.Document>({
    guildId: { type: String, required: true },
    memberId: { type: String, required: true },
    memberName: { type: String, required: true },
    issuerId: { type: String, default: 'pending', required: true },
    issuerName: { type: String, default: 'pending', required: true },
    status: { type: String, default: 'pending', required: true },
    answers: { type: Object, required: true, unique: true },
    registeredAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true },
    expireAt: { type: Number, required: true }
}));
