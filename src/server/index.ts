import * as dotenv from "dotenv";
dotenv.config()

global.__rootdir__ = __dirname || process.cwd();

declare global {
  var __rootdir__: string;
}

import 'module-alias/register';

import Environement from "@riniya.ts/server/utils/Environement";
import Authentication from "@riniya.ts/server/middleware/Authentication";
import BaseRoute from "@riniya.ts/server/base/BaseRoute";
import Database from "@riniya.ts/server/database/index";
import { Int, Str } from "@riniya.ts/types";
import RateLimit from "express-rate-limit"
import express, { Request, Response } from "express"
import session from "express-session"
import * as parser from "body-parser"
import http from "http";


const app = express();
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    skipSuccessfulRequests: true,
    message: {
        status: false,
        error: "Too many request."
    }
})
app.use(limiter)
app.use(parser.json())

export default class ServerManager {

    public static instance: ServerManager

    private routes: Array<BaseRoute>
    private server: http.Server

    public readonly environement: Environement

    private readonly version: String
    private readonly revision: String

    private readonly database: Database

    public constructor() {
        if (this.environement.init()) {
            console.error("-> Failed to setup the configuration.")
        } else {
            console.log("-> Configuration loaded.")
            console.log(`-> Version : ${this.version}`)
            console.log(`-> Revision : ${this.revision}`)
            ServerManager.instance = this

            this.environement = new Environement()
            this.database = new Database()

            this.version = this.environement.read<Str>("VERSION") || "No version set."
            this.revision = this.environement.read<Str>("REVISION") || "No revision set."

            this.startServices()
            this.environement.catch<Error>()
        }
    }

    private startServices() {
        if (this.database.connectMongoDB()) {
            console.log("-> Connected to the database.")
        } else {
            console.error("-> Impossible to reach the database.")
            process.abort()
        }

        this.startApp()
    }

    public startApp() {
        app.set("trust proxy", 1)

        app.use(session({
            secret: this.environement.read<string>("COOKIE_SESSION_SECRET"),
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }))

        this.server = http.createServer(app)

        app.get('/', (req: Request, res: Response) => {
            return res.status(200).json({
                appName: 'Riniya RESTFul API',
                appVersion: this.version,
                appRevision: this.revision,
                appAuthors: [
                    "NebraskyTheWolf <farfy.dev@gmail.com>"
                ]
            }).end()
        })

        this.routes.map(x => {
            if (x.isProtected())
                app.use('/api/v1', Authentication.handle , x.routing())
            else 
                app.use('/api/v1', x.routing())
        })

        this.server.listen(this.environement.read<Int>("PORT") || 3659)
    }

    public static getInstance(): ServerManager {
        return this.instance
    }
}

export const serverManager: ServerManager = new ServerManager()