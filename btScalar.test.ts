import {SIMD_PI, btFuzzyZero, btSqrt, btRecipSqrt} from "./btScalar"

describe("Scalar Test", function () {
    it("btFuzzyZero", () => {
        expect(btFuzzyZero(10)).toEqual(false);
        expect(btRecipSqrt(2)).toEqual(0.25);
    });
});
