import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import { serverManager } from "@riniya.ts/server/index";
import { Str } from "@riniya.ts/types";
import { Response } from "express";

class AuthenticationController extends BaseController {
    public login(request: CustomRequest, response: Response) {}
    public logout(request: CustomRequest, response: Response) {}
    public register(request: CustomRequest, response: Response) {}
    public resetPassword(request: CustomRequest, response: Response) {}
    public accountRecovery(request: CustomRequest, response: Response) {}
}

export default new AuthenticationController()