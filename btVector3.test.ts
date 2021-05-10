import {btVector3} from "./btVector3"

describe("Vector Test", function () {
    it("constructor", () => {
        let vec: btVector3 = new btVector3()
        expect(vec.m_floats[0]).toEqual(0);
        let vec2: btVector3 = new btVector3(1, 2, 3);
        expect(vec2.m_floats[0]).toEqual(1);
    });

    it("dot", () => {
        let vec = new btVector3(1, 2, 3);
        let vec2 = new btVector3(4, 5, 6);
        expect(vec.dot(vec2)).toEqual(4 + 10 + 18);
    });
});
