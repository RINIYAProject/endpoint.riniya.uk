import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    token?: string | JwtPayload
}

export default abstract class BaseMiddleware {
    public abstract handle(request: CustomRequest, response: Response, next: NextFunction): void
}