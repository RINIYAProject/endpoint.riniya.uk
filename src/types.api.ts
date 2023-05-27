import IBlacklist, { IBlacklist as Blacklist } from "./server/database/models/api/Common/Blacklist";
import Guild, { Guild as IGuild } from "./server/database/models/api/Guild";
import { isNull } from "./types";

export async function fetchBlacklist(identifier: string): Promise<Blacklist> {
    const cases = await IBlacklist.findOne({
        _id: identifier
    })
    return new Promise<Blacklist>((resolve, reject) => {
        if (isNull(cases.userId)) {
            reject({
                status: false,
                error: "This user is not blacklisted."
            })
        } else {
            resolve(cases)
        }
    })
}

export async function removeBlacklist(identifier: string): Promise<Boolean> {
    const cases = await IBlacklist.findOne({
        _id: identifier
    })
    return new Promise<Boolean>(async (resolve, reject) => {
        if (isNull(cases.userId)) {
            reject({
                status: false,
                error: "This user is not blacklisted."
            })
        } else {
            const rem = await IBlacklist.deleteOne({
                _id: cases._id
            })
            resolve(rem.acknowledged)
        }
    })
}

export async function fetchGuilds(): Promise<IGuild[]> {
    const guilds = (await Guild.find({})).map(x => {
        return x
    })
    return new Promise<IGuild[]>(async (resolve) => {
        resolve(guilds)
    })
}

export async function fetchGuildById(identifier: string): Promise<IGuild> {
    const guild = await Guild.findOne({
        guildId: identifier
    })
    return new Promise<IGuild>(async (resolve, reject) => {
        if (isNull(guild.ownerId)) {
            reject({
                status: false,
                error: "This guild does not exists."
            })
        } else {
            resolve(guild)
        }
    })
}