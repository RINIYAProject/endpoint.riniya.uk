import { randomInt } from "crypto";
import User, { User as IUser } from "./server/database/models/User";
import UserToken from "./server/database/models/UserToken";
import Encryption from "./server/utils/Encryption";

export declare type Str = String | string;
export declare type Int = Number | number;
export declare type Bool = Boolean | boolean;
export declare type Result = {
    status: boolean;
    error: string;
}

/**
 * @param object The object to check.
 * @description Checking is a object is null.
 */
export function isNull(object: unknown): Boolean {
    if (object === null || object === undefined)
        return true
    return false
}

/**
 * @param object The object to check.
 * @description Checking is a object is null and then checking is the type is the same. 
 */
export function isTypeNull<T>(object: unknown): Boolean {
    if (object === null || object === undefined || !(object as T))
        return true
    return false
}

/**
 * @param username
 * @param password
 * @description Fetching a user account with the credentials.
 */
export async function fetchUser(username: string, password: string): Promise<IUser> {
    const profile = await User.findOne({username: username})
    return new Promise<IUser>((resolve, reject) => {
        if (!isNull(profile) && isNull(profile.identifier)) {
            reject({
                status: false,
                error: "Please check the username or password."
            })
        } else {
            if (Encryption.compare(password, profile.password)) {
                resolve(profile)
            } else {
                reject({
                    status: false,
                    error: "The password does not match."
                })
            }
        }
    })
}

/**
 * @param username
 * @description Fetching a user account with the username.
 */
export async function fetchUserByName(username: string): Promise<IUser> {
    const profile = await User.findOne({username: username})
    return new Promise<IUser>((resolve, reject) => {
        if (!isNull(profile) && isNull(profile.identifier)) {
            reject({
                status: false,
                error: "Please check the username or password."
            })
        } else {
            resolve(profile)
        }
    })
}

/**
 * @param username
 * @description Fetching a user account with the identifier.
 */
export async function fetchUserById(identifier: string): Promise<IUser> {
    const profile = await User.findOne({identifier: identifier})
    return new Promise<IUser>((resolve, reject) => {
        if (!isNull(profile) && isNull(profile.identifier)) {
            reject({
                status: false,
                error: "Please check the username or password."
            })
        } else {
            resolve(profile)
        }
    })
}

/**
 * @param username
 * @description Fetching a user account with the email.
 */
export async function fetchUserByEmail(email: string): Promise<IUser> {
    const account = await User.findOne({
        email: email
    });
    return new Promise<IUser>((resolve, reject) => {
        if (!isNull(account) && isNull(account.identifier)) {
            reject({
                status: false
            })
        } else {
            resolve(account)
        }
    })
}

/**
 * @param username
 * @description Generating a 6 digits OTP code.
 */
export function generate(): string {
    return `${randomInt(9)}${randomInt(9)}${randomInt(9)}-${randomInt(9)}${randomInt(9)}${randomInt(9)}`
}

/**
 * @param identifier User identifier
 * @param type Type of token (confirm_email, reset_password,...)
 * @description Generating a 6 digits OTP code and saving in the database.
 */
export async function createToken(identifier: string, type: string): Promise<string> {
    if (isNull(identifier))
        throw new Error("The identifier cannot be blank.")
    const account: IUser = await fetchUserById(identifier)
    if (isNull(account.username)) 
        throw new Error("No account as been found.")

    const final: string = generate()
    new UserToken({
        identifier: identifier,
        expirationAt: new Date(0, 0, 0, 24),
        createdAt: Date.now(),
        isSent: true,
        token: final,
        type: type,
    }).save()

    return new Promise<string>((resolve) => {
        resolve(final)
    })
}