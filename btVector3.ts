import {btScalar} from "./btScalar"

export class BtVector3 {
    m_floats: btScalar[] = new Array(4)

    constructor()
    constructor(x: btScalar, y: btScalar, z: btScalar)

    constructor(_x?: btScalar, _y?: btScalar, _z?: btScalar) {
        this.m_floats.fill(0)
        if (_x && _y && _z) {
            this.m_floats[0] = _x;
            this.m_floats[1] = _y;
            this.m_floats[2] = _z;
        }
    }
}
