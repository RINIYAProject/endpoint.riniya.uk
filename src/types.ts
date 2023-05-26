export declare type Str = String | string;
export declare type Int = Number | number;
export declare type Bool = Boolean | boolean;


export function isNull(object: unknown): Boolean {
    if (object === null || object === undefined)
        return true
    return false
}

export function isTypeNull<T>(object: unknown): Boolean {
    if (object === null || object === undefined || !(object as T))
        return true
    return false
}