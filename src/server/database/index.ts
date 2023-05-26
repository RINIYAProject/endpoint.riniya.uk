import mongoose from "mongoose";
import { serverManager } from "@riniya.ts/server/index";
import { Bool } from "@riniya.ts/types";

export default class Database {
    public connectMongoDB(): Boolean {
        let state: Bool
        mongoose.connect(serverManager.getInstance().getEnvironement().read<string>("MONGODB_URL"), {

        }).then(() => {
            state = true
        }).catch(() => {
            state = false
        })

        return state
    }
}