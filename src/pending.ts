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

    public static create<Body extends any = any, Data extends any = any>(
        option: PendingRequestCreateOption<Body, Data>,
    ): PendingRequest<Body, Data> {

        return new PendingRequest(option);
    }

    private _pending: boolean;

    private readonly _response: Promise<IResponseConfig<Data>>;
    private readonly _abort: () => void;

    private _abortResponse?: () => void;

    private constructor(
        option: PendingRequestCreateOption<Body, Data>,
    ) {

        this._pending = true;

        this._abort = option.abort;
        this._response = new Promise<IResponseConfig<Data>>((
            resolve: (data: IResponseConfig<Data>) => void,
            reject: (reason: any) => void,
        ) => {

            this._abortResponse = () => {

                reject(new Error('[Barktler] Aborted'));
            };
            option.response.then((value: IResponseConfig<Data>) => {

                this._pending = false;
                resolve(value);
            });
        });
    }

    public get pending(): boolean {
        return this._pending;
    }
    public get completed(): boolean {
        return !this._pending;
    }
    public get response(): Promise<IResponseConfig<Data>> {
        return this._response;
    }

    public abort(): void {

        this._abort();
        this._abortResponse();
    }
}
