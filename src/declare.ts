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

export interface IInjectConfig {

    readonly requestBodyPattern?: Pattern;
    readonly responseBodyPattern?: Pattern;
}

export interface IRequestConfig<Body extends any = any> extends IInjectConfig {

    readonly url: string;
    readonly method: Method;

    readonly headers?: Record<string, string>;
    readonly params?: Record<string, string>;
    readonly body?: Body;

    readonly timeout?: number;

    readonly responseType?: ResponseType;
}

export interface IResponseConfig<Data extends any = any> extends IInjectConfig {

    readonly data: Data;
    readonly status: number;
    readonly statusText: string;

    readonly headers: Record<string, string>;
}

export type RequestDriver = <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>) => Promise<IResponseConfig<Data>>;
