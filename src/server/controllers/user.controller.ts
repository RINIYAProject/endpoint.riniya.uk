import { CustomRequest, UserToken } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import { isNull } from "@riniya.ts/types";
import { Response } from "express";
import { finish, throwError } from "@riniya.ts/types.server";

class UserController extends BaseController {
    public fetchMe(request: CustomRequest, response: Response) {
        if (isNull(request.token))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "MALFORMED_ACCOUNT",
                    message: "The data of the account seem to be corrupted."
                }
            })
                
        return finish<any>({
            response: response,
            request: {
                code: 200,
                data: request.token
            }
        })
    }

    public fetchAudit(request: CustomRequest, response: Response) {}

    public createProfile(request: CustomRequest, response: Response) {}
    public comfirmEmail(request: CustomRequest, response: Response) {}
    public linkAccount(request: CustomRequest, response: Response) {}
    public setupMfa(request: CustomRequest, response: Response) {}
}

export default new UserController()