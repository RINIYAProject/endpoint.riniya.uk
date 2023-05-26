import BaseMiddleware, { CustomRequest } from "@riniya.ts/server/base/BaseMiddleware"
import { serverManager } from "@riniya.ts/server/index"
import { isNull, isTypeNull } from "@riniya.ts/types"
import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"

class Authentication extends BaseMiddleware {
    public handle(request: CustomRequest, response: Response, next: NextFunction) {
        const token = request.header("Authorization")?.replace("Bearer ", "");

        if (isNull(token)) {
            return response.status(403).json({
                status: false,
                error: "INVALID_TOKEN"
            }).end();
        }
        
        const decoded = jwt.verify(token, serverManager.getInstance().getEnvironement().read<string>("JWT_SECRET_KEY"))
        if (isTypeNull<CustomRequest>(decoded)) {
            return response.status(500).json({
                status: false,
                error: "INTERNAL_ERROR"
            }).end();
        }
    
        request.token = decoded
        return next();
    }
}

export default new Authentication()