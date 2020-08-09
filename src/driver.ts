/**
 * @author WMXPY
 * @namespace Driver
 * @description Driver
 */

import { IRequestConfig, IResponseConfig } from "./declare";

export type RequestDriver = <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>) => Promise<IResponseConfig<Data>>;
