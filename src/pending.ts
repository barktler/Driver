/**
 * @author WMXPY
 * @namespace Driver
 * @description Pending
 */

import { IResponseConfig } from "./declare";

export type PendingRequestCreateOption<Body extends any = any, Data extends any = any> = {

    readonly response: Promise<IResponseConfig<Data>>;
    readonly abort: () => void;
};

export class PendingRequest<Body extends any = any, Data extends any = any> {

    public static create<Body extends any = any, Data extends any = any>(option: PendingRequestCreateOption<Body, Data>): PendingRequest<Body, Data> {

        return new PendingRequest(option);
    }

    private readonly _response: Promise<IResponseConfig<Data>>;
    private readonly _abort: () => void;

    private constructor(option: PendingRequestCreateOption<Body, Data>) {

        this._response = option.response;
        this._abort = option.abort;
    }

    public get response(): Promise<IResponseConfig<Data>> {
        return this._response;
    }

    public abort(): void {

        this._abort();
    }
}
