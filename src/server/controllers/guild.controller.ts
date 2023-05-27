import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import { Guild } from "@riniya.ts/server/database/models/api/Guild";
import { fetchGuilds, fetchGuildById, fetchGuildMembers, fetchGuildMember, fetchGuildMemberSanction, fetchGuildVerifications, fetchGuildVerificationById, fetchGuildActivity, fetchGuildActivityById, fetchGuildMessages, fetchGuildMessageById, fetchGuildMessageByMember, fetchGuildMemberProfile } from "@riniya.ts/types.api";
import { finish, throwError } from "@riniya.ts/types.server";
import { isNull } from "@riniya.ts/types";
import { Response } from "express";
import { Member } from "@riniya.ts/server/database/models/api/Member";
import { Sanction } from "@riniya.ts/server/database/models/api/Sanction";
import { Verification } from "@riniya.ts/server/database/models/api/Verification";
import { Activity } from "@riniya.ts/server/database/models/api/Activity";
import { Message } from "@riniya.ts/server/database/models/api/Common/Message";
import { Profile } from "../database/models/api/Common/Profile";

class GuildController extends BaseController {
    public async fetchGuilds(request: CustomRequest, response: Response) {
        return finish<Guild[]>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuilds()
            }
        })
    }

    public async fetchGuildById(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        if (isNull(server))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId'."
                }
            })

        return finish<Guild>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildById(server)
            }
        })
    }

    public async fetchMembers(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        if (isNull(server))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId'."
                }
            })

        return finish<Member[]>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildMembers(server)
            }
        })
    }

    public async fetchMemberById(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        const identifier: string = request.params.identifier;
        if (isNull(server) || isNull(identifier))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId' and 'memberId'."
                }
            })

        return finish<Member>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildMember(server, identifier)
            }
        })
    }

    public async fetchMemberProfile(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        const identifier: string = request.params.identifier;
        if (isNull(server) || isNull(identifier))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId'."
                }
            })

        return finish<Profile>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildMemberProfile(identifier)
            }
        })
    }

    public async fetchMemberSanctions(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        const identifier: string = request.params.identifier;
        if (isNull(server) || isNull(identifier))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId' and 'memberId'."
                }
            })

        return finish<Sanction[]>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildMemberSanction(server, identifier)
            }
        })
    }

    public async fetchVerifications(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        if (isNull(server))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId'."
                }
            })

        return finish<Verification[]>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildVerifications(server)
            }
        })
    }

    public async fetchVerificationsById(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        const identifier: string = request.params.identifier;
        if (isNull(server) || isNull(identifier))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId' and 'verificationId'."
                }
            })

        return finish<Verification>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildVerificationById(server, identifier)
            }
        })
    }

    public async fetchActivities(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        if (isNull(server))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId'."
                }
            })

        return finish<Activity[]>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildActivity(server)
            }
        })
    }

    public async fetchActivityById(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        const identifier: string = request.params.identifier;
        if (isNull(server) || isNull(identifier))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId' and 'activityId'."
                }
            })

        return finish<Activity>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildActivityById(server, identifier)
            }
        })
    }

    public async createActivity(request: CustomRequest, response: Response) {
        return throwError({
            response: response,
            request: {
                code: 403,
                error: "NYI",
                message: "Not yet implemented."
            }
        })
    }

    public async fetchMessages(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        if (isNull(server))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId'."
                }
            })

        return finish<Message[]>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildMessages(server)
            }
        })
    }

    public async fetchMessageById(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        const identifier: string = request.params.identifier;
        if (isNull(server) || isNull(identifier))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId' and 'messageId'."
                }
            })

        return finish<Message>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildMessageById(server, identifier)
            }
        })
    }

    public async fetchMessagesByMember(request: CustomRequest, response: Response) {
        const server: string = request.params.server;
        const identifier: string = request.params.identifier;
        if (isNull(server) || isNull(identifier))
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "IDENTIFIER_INVALID",
                    message: "Please specify the 'guildId' and 'memberId'."
                }
            })

        return finish<Message[]>({
            response: response,
            request: {
                code: 200,
                data: await fetchGuildMessageByMember(server, identifier)
            }
        })
    }
}

export default new GuildController()