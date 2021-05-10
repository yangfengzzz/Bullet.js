import {btFuzzyZero} from "./btScalar"

describe("Scalar Test", function () {
    it("btFuzzyZero", () => {
        expect(btFuzzyZero(false)).toEqual(false)
    });
});
