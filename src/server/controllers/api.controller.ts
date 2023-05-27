import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import ServerManager from "@riniya.ts/server/index";
import { Str } from "@riniya.ts/types";
import { Response } from "express";

class ApiController extends BaseController {
    //TODO: Redis datastore sync 
    public fetchCommands(request: CustomRequest, response: Response) {
        return this.throwError({
            response: response,
            request: {
                code: 403,
                error: "NYI",
                message: "Method not implemented yet."
            }
        })
    }

    public fetchInvite(request: CustomRequest, response: Response) {
        return this.finish<{
            invite_url: string;
        }>({
            response: response, 
            request: {
                code: 200,
                data: {
                    invite_url:  `https://discord.com/api/oauth2/authorize?client_id=${ServerManager.instance.environement.read<Str>("RINIYA_APP_IDENTIFIER")}&permissions=8&scope=bot`
                }
            }
        })
    }
}

export default new ApiController()