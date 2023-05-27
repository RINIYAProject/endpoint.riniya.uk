import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import {  isNull } from "@riniya.ts/types";
import { Response } from "express";
import { fetchBlacklist, removeBlacklist } from "@riniya.ts/types.api";
import { IBlacklist } from "../database/models/api/Common/Blacklist";

class BlacklistController extends BaseController {
    public async fetch(request: CustomRequest, response: Response) {
        const identifier: string = request.body.identifier;
        if (isNull(identifier))
            return this.throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please set the case identifier."
                }
            })
        
        await fetchBlacklist(identifier).then(account => {
            return this.finish<IBlacklist>({
                response: response,
                request: {
                    code: 200,
                    data: account
                }
            })
        }).catch(err => {
            return this.throwError({
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
        return this.throwError({
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
            return this.throwError({
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
            this.throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please set the case identifier."
                }
            })
        
        await fetchBlacklist(identifier).then(async sanction => {
            await removeBlacklist(identifier).then(op => {
                return this.finish<{
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
                return this.throwError({
                    response: response,
                    request: {
                        code: 500,
                        error: "INTERNAL_ERROR",
                        message: "This case cannot be deleted."
                    }
                })
            })
        }).catch(err => {
            return this.throwError({
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