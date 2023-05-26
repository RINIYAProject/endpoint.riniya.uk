import User, { User as IUser } from "@riniya.ts/server/database/models/User"
import { isNull } from "@riniya.ts/types"

export default class UserQuery {
    public async findUser(identifier: string): Promise<IUser> {
        if (isNull(identifier))
            throw new Error("'identifier' cannot be null.")

        const userData = await User.findOne({
            identifier: identifier
        }) as IUser

        if (isNull(userData.identifier) || isNull(userData.email))
            throw new Error("'identifier' and 'email' cannot be null.")

        return new Promise<IUser>((resolve) => {
            resolve(userData)
        })
    }

    public 
}