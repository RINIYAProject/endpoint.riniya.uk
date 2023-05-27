import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import ServerManager from "@riniya.ts/server/index";
import { Result, createToken, fetchUser, fetchUserByEmail, fetchUserByName, isNull } from "@riniya.ts/types";
import { Response } from "express";
import Encryption from "../utils/Encryption";

import jwt from "jsonwebtoken"
import User, { Partials } from "../database/models/User";
import { v4 } from "uuid";

class AuthenticationController extends BaseController {
    public async login(request: CustomRequest, response: Response) {
        const username: string = request.body.username;
        const password: string = Encryption.generateHash(
            request.body.password
        ) || "";

        if (isNull(username))
            return this.throwError({
                response: response,
                request: {
                    code: 403,
                    error: "CREDENTIALS_ERROR",
                    message: "The username cannot be blank."
                }
            })

        await fetchUser(
            username,
            password
        ).then(profile => {
            if (profile.security.isTerminated) {
                return this.throwError({
                    response: response,
                    request: {
                        code: 403,
                        error: "ACCOUNT_TERMINATED",
                        message: "This account is banned"
                    }
                })
            }

            if (!profile.security.isEmailVerified) {
                return this.throwError({
                    response: response,
                    request: {
                        code: 403,
                        error: "EMAIL_NOT_CERTIFIED",
                        message: "Please verify your email first."
                    }
                })
            }

            /**
             * @access MFA
             * @description 2FA Login safety feature
             * @todo if (profile.security.isMFAEnabled) {}
             */

            return this.finish<{
                token: string;
            }>({
                response: response,
                request: {
                    code: 200,
                    data: {
                        token: jwt.sign(profile, ServerManager.instance.environement.read<string>("JWT_SECRET_KEY"), {
                            issuer: "Riniya Security Provider",
                            algorithm: "ES256",
                            expiresIn: "30m"
                        })
                    }
                }
            })
        }).catch((error: Result) => {
            return this.throwError({
                response: response,
                request: {
                    code: 403,
                    error: "ACCOUNT_NOT_FOUND",
                    message: error.error
                }
            })
        })
    }

    public logout(request: CustomRequest, response: Response) {
        return this.throwError({
            response: response,
            request: {
                code: 501,
                error: "NYI",
                message: "Not yet implemented."
            }
        })
    }

    public async register(request: CustomRequest, response: Response) {
        const username: string = request.body.username;
        const password: string = request.body.password;
        const profile: Partials = request.body.profile;
        const email: string = request.body.email;

        if (isNull(username) 
            && isNull(password)
            && isNull(profile)
            && isNull(email))
                return this.throwError({
                    response: response,
                    request: {
                        code: 501,
                        error: "INVALID_ACCOUNT_DATA",
                        message: "Missing required arguments."
                    }
                })

        await fetchUserByEmail(email).then(account => {
            if (!isNull(account.identifier)) {
                return this.throwError({
                    response: response,
                    request: {
                        code: 501,
                        error: "EMAIL_ALREADY_USED",
                        message: "The email is already used."
                    }
                })
            }
        });

        await fetchUserByName(username).then(account => {
            if (!isNull(account.identifier)) {
                return this.throwError({
                    response: response,
                    request: {
                        code: 501,
                        error: "USERNAME_ALREADY_USED",
                        message: "This username is already used."
                    }
                })
            }
        });

        new User({
            roleIdentifier: ServerManager.instance.environement.read<string>("ACT_DEFAULT_ROLE"),
            identifier: v4().replaceAll('-', '') /** Removing the uuid separators */,
            username: username,
            password: Encryption.generateHash(password),
            email: email,
            profile: {
                avatarURL: "https://cdn.riniya.uk/avatars/default.png",
                bannerURL: "https://cdn.riniya.uk/banners/default.png",
                language: "English",
                country: "Not set."
            },
            security: {
                isMFAEnabled: false,
                isEmailVerified: false,
                isTerminated: false,
                isOnboardFinished: false
            }
        }).save().catch(err => {
            return this.throwError({
                response: response,
                request: {
                    code: 500,
                    error: "ACCOUNT_CREATION_ERROR",
                    message: "We are sorry but the reuqest has failed, Please try again later."
                }
            })
        })

        return this.finish<{
            result: string;
        }>({
            response: response,
            request: {
                code: 200,
                data: {
                    result: "ACCOUNT_CREATED"
                }
            }
        });
    }

    public async resetPassword(request: CustomRequest, response: Response) {
        const email: string = request.body.email;

        if (isNull(email))
            return this.throwError({
                response: response,
                request: {
                    code: 403,
                    error: "EMAIL_NOT_VALID",
                    message: "Please enter your email address and try again"
                }
            })
        
        await fetchUserByEmail(email).then(async account => {
            const code: string = await createToken(account.identifier, "confirm_email")
            /**
             * @description Sending comfirmation code to the receiver.
             * @todo
             */

            return this.sendEmail(email, response)
        }).catch((err: Result) => {
            return this.sendEmail(email, response)
        })
    }

    public accountRecovery(request: CustomRequest, response: Response) {
        return this.throwError({
            response: response,
            request: {
                code: 501,
                error: "NYI",
                message: "Not yet implemented."
            }
        })
    }

     /**
      * @param email The email of the account owner.
      * @param response Express response class.
      * @description Sending a basic response, to avoid brutforcing.
      */
    private sendEmail(email: string, response: Response) {
        return this.finish<{
            result: string;
        }>({
            response: response,
            request: {
                code: 200,
                data: {
                    result: `A email has been sent to ${email}, If you have a account with us, you will receive a email.`
                }
            }
        })
    }
}

export default new AuthenticationController()