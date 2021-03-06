/**
 * @author WMXPY
 * @namespace Driver
 * @description Pending
 */

import { IResponseConfig } from "./declare";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type PendingRequestCreateOption<Body extends any = any, Data extends any = any> = {

    readonly response: Promise<IResponseConfig<Data>>;
    readonly abort: () => void;
};

export class PendingRequest<Body extends any = any, Data extends any = any> {

    // eslint-disable-next-line @typescript-eslint/no-shadow
    public static create<Body extends any = any, Data extends any = any>(
        option: PendingRequestCreateOption<Body, Data>,
    ): PendingRequest<Body, Data> {

        return new PendingRequest(option);
    }

    private _pending: boolean;
    private _succeed: boolean;

    private readonly _response: Promise<IResponseConfig<Data>>;
    private readonly _abort: () => void;

    private _abortResponse?: () => void;

    private constructor(
        option: PendingRequestCreateOption<Body, Data>,
    ) {

        this._pending = true;
        this._succeed = false;

        this._abort = option.abort;

        this._response = new Promise<IResponseConfig<Data>>((
            resolve: (data: IResponseConfig<Data>) => void,
            reject: (reason: any) => void,
        ) => {

            this._abortResponse = () => {

                if (this._pending) {
                    reject(new Error('[Barktler] Aborted'));
                }
            };
            option.response.then((value: IResponseConfig<Data>) => {

                if (value.succeed) {
                    this._succeed = true;
                } else {
                    this._succeed = false;
                }

                this._pending = false;

                resolve(value);
            }).catch((reason: any) => {

                this._pending = false;
                this._succeed = false;

                reject(reason);
            });
        });
    }

    public get pending(): boolean {
        return this._pending;
    }
    public get completed(): boolean {
        return !this._pending;
    }
    public get succeed(): boolean {
        return this._succeed;
    }
    public get failed(): boolean {
        return !this._succeed;
    }
    public get response(): Promise<IResponseConfig<Data>> {
        return this._response;
    }

    public abort(): void {

        this._abort();
        if (this._abortResponse) {
            this._abortResponse();
        }
    }
}
