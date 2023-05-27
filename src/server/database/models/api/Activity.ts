/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Activity.ts                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: NebraskyTheWolf <contact@ghidorah.uk>      +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/01/03 23:28:32 by NebraskyThe       #+#    #+#             */
/*   Updated: 2023/01/03 23:31:20 by NebraskyThe      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import mongoose from "mongoose";

export interface Activity {
    guildId: string;
    memberId: string;
    type: string;
    action: string;
    registeredAt: Date;
}

export default mongoose.model<Activity & mongoose.Document>("Activity", new mongoose.Schema<Activity & mongoose.Document>({
    guildId: { type: String, required: true },
    memberId: { type: String, required: true },
    type: { type: String, required: true },
    action: { type: String, required: true },
    registeredAt: { type: Date, required: true },
}));