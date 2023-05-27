import { Response } from "express";

export interface Base<T> {
    response: Response,
    request: T
}

export interface ErrorOption {
    code: number;
    error: string;
    message: string;
} 

export interface ResultOption<T> {
    code: number;
    data: T
} 

export function throwError(req: Base<ErrorOption>) {
    console.log(JSON.stringify(req.request))

    return req.response.status(req.request.code).json({
        status: false, 
        error: req.request.error,
        message: req.request.message
    }).end();
}

export function finish<T>(req: Base<ResultOption<T>>) {
    console.log(JSON.stringify(req.request))

    return req.response.status(req.request.code).json({
        status: true, 
        data: req.request.data
    }).end();
}