import {BtVector3} from "./btVector3"

describe("Vector Test", function () {
    it("constructor", () => {
        let vec:BtVector3 = new BtVector3()
        expect(vec.m_floats[0]).toEqual(0);
        let vec2:BtVector3 = new BtVector3(1, 2, 3);
        expect(vec2.m_floats[0]).toEqual(1);
    });
});
