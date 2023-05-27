import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import { Guild } from "@riniya.ts/server/database/models/api/Guild";
import { fetchGuilds, fetchGuildById } from "@riniya.ts/types.api";
import { Response } from "express";
import { isNull } from "@riniya.ts/types";

class GuildController extends BaseController {
    public async fetchGuilds(request: CustomRequest, response: Response) {
        return this.finish<Guild[]>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuilds()
            }
        })
    }

    public async fetchGuildById(request: CustomRequest, response: Response) {
        const identifier: string = request.params.identifier;
        if (isNull(identifier))
            return this.throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId'."
                }
            })

        return this.finish<Guild>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildById(identifier)
            }
        })
    }
    public fetchMembers(request: CustomRequest, response: Response) {}
    public fetchMemberById(request: CustomRequest, response: Response) {}
    public fetchMemberProfile(request: CustomRequest, response: Response) {}
    public fetchMemberSanctions(request: CustomRequest, response: Response) {}

    public fetchVerifications(request: CustomRequest, response: Response) {}
    public fetchVerificationsById(request: CustomRequest, response: Response) {}

    public fetchActivities(request: CustomRequest, response: Response) {}
    public fetchActivityById(request: CustomRequest, response: Response) {}
    public createActivity(request: CustomRequest, response: Response) {}

    public fetchMessages(request: CustomRequest, response: Response) {}
    public fetchMessageById(request: CustomRequest, response: Response) {}
    public fetchMessagesByMember(request: CustomRequest, response: Response) {}
}

export default new GuildController()