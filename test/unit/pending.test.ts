/**
 * @author WMXPY
 * @namespace Driver
 * @description Pending
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { PendingRequest } from "../../src/pending";
import { createMockResponseConfig } from "../mock/mock";

describe('Given {PendingRequest} Class', (): void => {

    const chance: Chance.Chance = new Chance('driver-pending-request');

    it('should be able to return response', async (): Promise<void> => {

        const data: string = chance.string();

        let aborted: boolean = false;

        const pending: PendingRequest<string, string> = PendingRequest.create({

            // eslint-disable-next-line @typescript-eslint/require-await
            response: (async () => {
                return createMockResponseConfig(data, chance);
            })(),
            abort: () => {
                aborted = true;
            },
        });

        const response = await pending.response;
        console.log(response, aborted);
    });
});
