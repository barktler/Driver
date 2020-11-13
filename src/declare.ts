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

    readonly requestParamsPattern?: Pattern;
    readonly requestHeadersPattern?: Pattern;
    readonly requestBodyPattern?: Pattern;

    readonly responseHeadersPattern?: Pattern;
    readonly responseDataPattern?: Pattern;

    readonly errorPayloadPattern?: Pattern;
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

export interface IErrorConfig<Payload extends any = any> extends IInjectConfig {

    readonly payload: Payload;
}
