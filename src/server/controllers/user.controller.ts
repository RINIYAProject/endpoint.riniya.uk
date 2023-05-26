import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import { serverManager } from "@riniya.ts/server/index";
import { Str } from "@riniya.ts/types";
import { Response } from "express";

class UserController extends BaseController {
    public fetchMe(request: CustomRequest, response: Response) {}
    public fetchAudit(request: CustomRequest, response: Response) {}

    public createProfile(request: CustomRequest, response: Response) {}
    public comfirmEmail(request: CustomRequest, response: Response) {}
    public linkAccount(request: CustomRequest, response: Response) {}
    public setupMfa(request: CustomRequest, response: Response) {}
}

export default new UserController()