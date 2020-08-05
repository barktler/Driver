/**
 * @author WMXPY
 * @namespace Driver
 * @description Declare
 */

import { Pattern } from "@sudoo/pattern";

export type Method =
    | "GET"
    | "DELETE"
    | "HEAD"
    | "OPTIONS"
    | "POST"
    | "PUT"
    | "PATCH"
    | "LINK"
    | "UNLINK";

export type ResponseType =
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";

export interface IRequestConfig<Body extends any = any> {

    readonly url: string;
    readonly method: Method;

    readonly headers?: Record<string, string>;
    readonly params?: Record<string, string>;
    readonly body?: Body;

    readonly timeout?: number;

    readonly responseType?: ResponseType;
    readonly pattern?: Pattern;
}

export interface IResponseConfig<Data extends any = any> {

    readonly data: Data;
    readonly status: number;
    readonly statusText: string;

    readonly headers: Record<string, string>;
    readonly pattern?: Pattern;
}

export type RequestDriver = <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>) => Promise<IResponseConfig<Data>>;
