import { Result, createToken, fetchUser, fetchUserByEmail, fetchUserByName, isNull } from "@riniya.ts/types";
import { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware";
import { BaseController } from "@riniya.ts/server/base/BaseController";
import User, { Partials } from "@riniya.ts/server/database/models/User";
import { finish, sendEmail, throwError } from "@riniya.ts/types.server";
import Encryption from "@riniya.ts/server/utils/Encryption";
import ServerManager from "@riniya.ts/server/index";

import { Response } from "express";
import jwt from "jsonwebtoken"
import { v4 } from "uuid";

class AuthenticationController extends BaseController {
    public async login(request: CustomRequest, response: Response) {
        const username: string = request.body.username;
        const password: string = request.body.password;

        if (isNull(username))
            return throwError({
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
                return throwError({
                    response: response,
                    request: {
                        code: 403,
                        error: "ACCOUNT_TERMINATED",
                        message: "This account is banned"
                    }
                })
            }

            if (!profile.security.isEmailVerified) {
                return throwError({
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

            jwt.sign({
                roleIdentifier: profile.roleIdentifier,
                identifier: profile.identifier,
                username: profile.username,
                security: profile.security,
                profile: profile.profile,
                email: profile.email
            }, ServerManager.instance.environement.read<string>("JWT_SECRET_KEY").replaceAll('-', ''), {
                expiresIn: "10m"
            }, (error, token) => {
                if (error) {
                    return throwError({
                        response: response,
                        request: {
                            code: 403,
                            error: "ENCRYPTION_ERROR",
                            message: error.message
                        }
                    })
                }

                return finish<{
                    token: string;
                }>({
                    response: response,
                    request: {
                        code: 200,
                        data: {
                            token: token
                        }
                    }
                })
            });
        }).catch((error: Result) => {
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "ACCOUNT_NOT_FOUND",
                    message: error
                }
            })
        })
    }

    public logout(request: CustomRequest, response: Response) {
        return throwError({
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
                return throwError({
                    response: response,
                    request: {
                        code: 501,
                        error: "INVALID_ACCOUNT_DATA",
                        message: "Missing required arguments."
                    }
                })

        await fetchUserByEmail(email).then(account => {
            if (!isNull(account) && !isNull(account.identifier)) {
                return throwError({
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
            if (!isNull(account) &&!isNull(account.identifier)) {
                return throwError({
                    response: response,
                    request: {
                        code: 501,
                        error: "USERNAME_ALREADY_USED",
                        message: "This username is already used."
                    }
                })
            }
        });

        const identifier: string = v4().replaceAll('-', '') /** Removing the uuid separators */; 

        new User({
            roleIdentifier: ServerManager.instance.environement.read<string>("ACT_DEFAULT_ROLE"),
            identifier: identifier,
            username: username,
            password: Encryption.generateHash(password),
            email: email,
            profile: profile,
            security: {
                isMFAEnabled: false,
                isEmailVerified: false,
                isTerminated: false,
                isOnboardFinished: false
            }
        }).save().catch(err => {
            return throwError({
                response: response,
                request: {
                    code: 500,
                    error: "ACCOUNT_CREATION_ERROR",
                    message: "We are sorry but the reuqest has failed, Please try again later."
                }
            })
        })

        /**
         * @param identifier
         * @param type
         * @description Sending the confirmation code to the owner of the account
         * @todo const code: string = await createToken(identifier, "comfirm_email")
         */

        return finish<{
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
            return throwError({
                response: response,
                request: {
                    code: 403,
                    error: "EMAIL_NOT_VALID",
                    message: "Please enter your email address and try again"
                }
            })
        
        await fetchUserByEmail(email).then(async account => {
            const code: string = await createToken(account.identifier, "reset_password")
            /**
             * @description Sending comfirmation code to the receiver.
             * @todo
             */

            return sendEmail(email, response)
        }).catch((err: Result) => {
            return sendEmail(email, response)
        })
    }

    public accountRecovery(request: CustomRequest, response: Response) {
        return throwError({
            response: response,
            request: {
                code: 501,
                error: "NYI",
                message: "Not yet implemented."
            }
        })
    }
}

export default new AuthenticationController()