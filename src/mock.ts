/**
 * @author WMXPY
 * @namespace Driver
 * @description Mock
 */

import { Generator } from "@sudoo/generator";
import { IRequestConfig, IResponseConfig, RequestDriver } from "./declare";

// eslint-disable-next-line @typescript-eslint/require-await
export const mockDriver: RequestDriver = async  <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>): Promise<IResponseConfig<Data>> => {

    if (!request.responseBodyPattern) {

        throw new Error('[Barktler] Response data pattern not declared');
    }

    const generator: Generator = Generator.create(request.responseBodyPattern);
    return generator.generate();
};
