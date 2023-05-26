import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import { serverManager } from "@riniya.ts/server/index";
import { Str } from "@riniya.ts/types";
import { Response } from "express";

class GuildController extends BaseController {
    public fetchGuilds(request: CustomRequest, response: Response) {}
    public fetchGuildById(request: CustomRequest, response: Response) {}
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