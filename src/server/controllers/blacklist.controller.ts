import { IBlacklist } from "@riniya.ts/server/database/models/api/Common/Blacklist";
import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import { finish, throwError } from "@riniya.ts/types.server";
import { fetchBlacklist, removeBlacklist } from "@riniya.ts/types.api";
import { isNull } from "@riniya.ts/types";

import { Response } from "express";

class BlacklistController extends BaseController {
    public async fetch(request: CustomRequest, response: Response) {
        const identifier: string = request.params.identifier;
        if (isNull(identifier))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please set the case identifier."
                }
            })
        
        await fetchBlacklist(identifier).then(account => {
            return finish<IBlacklist>({
                response: response,
                request: {
                    code: 200,
                    data: account
                }
            })
        }).catch(err => {
            return throwError({
                response: response,
                request: {
                    code: 500,
                    error: "CASE_NOT_FOUND",
                    message: "This identifier is not valid."
                }
            })
        })
    }

    /**
     * @description Creating blacklist cases
     * @todo
     */
    public create(request: CustomRequest, response: Response) {
        return throwError({
            response: response,
            request: {
                code: 403,
                error: "NYI",
                message: "Not yet implemented."
            }
        })
    }

    public edit(request: CustomRequest, response: Response) {
        const identifier: string = request.body.identifier;
        if (isNull(identifier))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please set the case identifier."
                }
            })
        /**
         * @description Patching the case data with the new.
         * @todo
         */
    }

    public async remove(request: CustomRequest, response: Response) {
        const identifier: string = request.body.identifier;
        if (isNull(identifier))
            throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please set the case identifier."
                }
            })
        
        await fetchBlacklist(identifier).then(async sanction => {
            await removeBlacklist(identifier).then(op => {
                return finish<{
                    identifier: string;
                    result: string;
                }>({
                    response: response,
                    request: {
                        code: 200,
                        data: {
                            identifier: identifier,
                            result: "BLACKLIST_REMOVED"
                        }
                    }
                })
            }).catch(err => {
                return throwError({
                    response: response,
                    request: {
                        code: 500,
                        error: "INTERNAL_ERROR",
                        message: "This case cannot be deleted."
                    }
                })
            })
        }).catch(err => {
            return throwError({
                response: response,
                request: {
                    code: 500,
                    error: "CASE_NOT_FOUND",
                    message: "This identifier is not valid."
                }
            })
        })
    }
}

export default new BlacklistController()