/**
 * @author WMXPY
 * @namespace Driver
 * @description Pending
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";

describe('Given {PendingRequest} Class', (): void => {

    const chance: Chance.Chance = new Chance('driver-pending-request');

    it('should be able to return response', (): void => {

        expect(chance.string()).to.be.not.equal(chance.string());
    });
});
