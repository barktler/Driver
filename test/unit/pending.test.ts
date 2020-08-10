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
        expect(pending.succeed).to.be.true;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(aborted).to.be.false;
    });

    it('should be able to fail response', async (): Promise<void> => {

        let aborted: boolean = false;

        const pending: PendingRequest<string, string> = PendingRequest.create({

            // eslint-disable-next-line @typescript-eslint/require-await
            response: (async () => {
                throw new Error("Failed");
            })(),
            abort: () => {
                aborted = true;
            },
        });

        let error: any;

        try {
            await pending.response;
        } catch (reason) {
            error = reason;
        } finally {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(aborted).to.be.false;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(pending.failed).to.be.true;
            expect(error.message).to.be.equal("Failed");
        }
    });

    it('should be able to abort response', async (): Promise<void> => {

        const data: string = chance.string();

        let aborted: boolean = false;

        const pending: PendingRequest<string, string> = PendingRequest.create({

            // eslint-disable-next-line @typescript-eslint/require-await
            response: (async () => {
                await Sleep.for(10)
                return createMockResponseConfig(data, chance);
            })(),
            abort: () => {
                aborted = true;
            },
        });

        setTimeout(() => {
            pending.abort();
        }, 5);

        let error: any;

        try {
            await pending.response;
        } catch (reason) {
            error = reason;
        } finally {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            expect(aborted).to.be.true;
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
