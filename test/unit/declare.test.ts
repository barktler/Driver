/**
 * @author WMXPY
 * @namespace Driver
 * @description Declare
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";

describe('Given <Declare> Types', (): void => {

    const chance: Chance.Chance = new Chance('driver');

    it('placeholder', (): void => {

        expect(chance.string()).to.be.not.equal(chance.string());
    });
});
