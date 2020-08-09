/**
 * @author WMXPY
 * @namespace Driver
 * @description Pending
 */

import { IResponseConfig } from "./declare";

export class PendingRequest<Body extends any = any, Data extends any = any> {

    private readonly _response: Promise<IResponseConfig<Data>>;
}
