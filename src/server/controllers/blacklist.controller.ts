import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import { serverManager } from "@riniya.ts/server/index";
import { Str } from "@riniya.ts/types";
import { Response } from "express";

class BlacklistController extends BaseController {
    public fetch(request: CustomRequest, response: Response) {}
    public create(request: CustomRequest, response: Response) {}
    public edit(request: CustomRequest, response: Response) {}
    public remove(request: CustomRequest, response: Response) {}
}

export default new BlacklistController()