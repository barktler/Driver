/**
 * @author WMXPY
 * @namespace Driver
 * @description Mock
 * @override Mock
 */

import { IResponseConfig } from "../../src/declare";

export const createMockResponseConfig = (data: string, chance: Chance.Chance): IResponseConfig<string> => {

    return {
        data,
        status: 200,
        statusText: chance.string(),

        headers: {},
    };
};
