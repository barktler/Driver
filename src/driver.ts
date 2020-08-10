/**
 * @author WMXPY
 * @namespace Driver
 * @description Driver
 */

import { IRequestConfig } from "./declare";
import { PendingRequest } from "./pending";

export type RequestDriver = <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>) => PendingRequest<Body, Data>;
