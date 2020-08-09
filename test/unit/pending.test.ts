/**
 * @author WMXPY
 * @namespace Driver
 * @description Pending
 * @override Unit
 */

import { Sleep } from "@sudoo/asynchronous";
import { expect } from "chai";
import * as Chance from "chance";
import { IResponseConfig } from "../../src/declare";
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

        const response: IResponseConfig<string> = await pending.response;

        expect(response.data).to.be.equal(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(aborted).to.be.false;
    });

    it('should be able to abort response', async (): Promise<void> => {

        const data: string = chance.string();

        let aborted: boolean = false;

        const pending: PendingRequest<string, string> = PendingRequest.create({

            // eslint-disable-next-line @typescript-eslint/require-await
            response: (async () => {
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                await Sleep.for(30)
                return createMockResponseConfig(data, chance);
            })(),
            abort: () => {
                aborted = true;
            },
        });

        setTimeout(() => {
            pending.abort();
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        }, 10);

        let error: any;

        try {
            const response: IResponseConfig<string> = await pending.response;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(response).to.be.undefined;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(aborted).to.be.true;
        } catch (reason) {
            error = reason;
        } finally {
            expect(error.message).to.be.equal("[Barktler] Aborted");
        }
    });

    it('should be able to double return response', async (): Promise<void> => {

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

        const response: IResponseConfig<string> = await pending.response;

        expect(response.data).to.be.equal(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(aborted).to.be.false;

        const response2: IResponseConfig<string> = await pending.response;

        expect(response2.data).to.be.equal(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(aborted).to.be.false;
    });
});
