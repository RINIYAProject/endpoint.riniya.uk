import { isNull } from "@riniya.ts/types";

export default class Environement {
    public init(): Boolean {
        if (this.unset("MONGODB_URL"))
            return this.print("MONGODB_URL")
        else if (this.unset("REDIS_URL"))
            return this.print("REDIS_URL")
        else if (this.unset("GATEWAY_URL"))
            return this.print("GATEWAY_URL")
        else if (this.unset("CORS_ALLOWED_ORIGINS"))
            return this.print("CORS_ALLOWED_ORIGINS")
        else if (this.unset("CORS_ALLOWED_METHODS"))
            return this.print("CORS_ALLOWED_METHODS")
        return false
    }

    public unset(key: string): Boolean {
        return isNull(process.env[key])
    }

    public read<T>(key: string): T {
        if (this.unset(key))
            this.print(key)
        return process.env[key] as T
    }

    public catch<T>() {
        process.on('uncaughtException', function (error: T) {
            console.error(`-> 'uncaughtException' : ${error}`)
        })
        process.on('unhandledRejection', function (error: T) {
            console.error(`-> 'unhandledRejection' : ${error}`)
        })
    }

    private print(key: string): Boolean {
        console.error("-------------------------------------------")
        console.error(" -> Environement failed at '" + key + "'.  ")
        console.error("   -> Please check your environement file. ")
        console.error("   -> Restart is required to continue.     ")
        console.error("-------------------------------------------")
        return true;
    }
}