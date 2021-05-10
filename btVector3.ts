import * as btScalar from "./btScalar"

export class btVector3 {
    m_floats: btScalar.btScalar[] = new Array(4)

    constructor()
    constructor(x: btScalar.btScalar, y: btScalar.btScalar, z: btScalar.btScalar)

    constructor(_x?: btScalar.btScalar, _y?: btScalar.btScalar, _z?: btScalar.btScalar) {
        this.m_floats.fill(0)
        if (_x && _y && _z) {
            this.m_floats[0] = _x;
            this.m_floats[1] = _y;
            this.m_floats[2] = _z;
        }
    }

    /**@brief Add a vector to this one
     * @param v vector to add to this one */
    add(v: btVector3) {
        this.m_floats[0] += v.m_floats[0];
        this.m_floats[1] += v.m_floats[1];
        this.m_floats[2] += v.m_floats[2];
    }

    static add(left: btVector3, right: btVector3, out: btVector3) {
        out.m_floats[0] = left.m_floats[0] + right.m_floats[0];
        out.m_floats[1] = left.m_floats[1] + right.m_floats[1];
        out.m_floats[2] = left.m_floats[2] + right.m_floats[2];
    }

    /**@brief Subtract a vector from this one
     * @param v vector to subtract */
    subtract(v: btVector3) {
        this.m_floats[0] -= v.m_floats[0];
        this.m_floats[1] -= v.m_floats[1];
        this.m_floats[2] -= v.m_floats[2];
    }

    static subtract(left: btVector3, right: btVector3, out: btVector3) {
        out.m_floats[0] = left.m_floats[0] - right.m_floats[0];
        out.m_floats[1] = left.m_floats[1] - right.m_floats[1];
        out.m_floats[2] = left.m_floats[2] - right.m_floats[2];
    }

    /**@brief Scale the vector
     * @param s Scale factor */
    scale(s: btScalar.btScalar) {
        this.m_floats[0] *= s;
        this.m_floats[1] *= s;
        this.m_floats[2] *= s;
    }

    static scale(left: btVector3, right: btScalar.btScalar, out: btVector3) {
        out.m_floats[0] = right * left.m_floats[0];
        out.m_floats[1] = right * left.m_floats[1];
        out.m_floats[2] = right * left.m_floats[2];
    }

    /**@brief Inversely scale the vector
     * @param s Scale factor to divide by */
    inverse_scale(s: btScalar.btScalar) {
        this.m_floats[0] /= s;
        this.m_floats[1] /= s;
        this.m_floats[2] /= s;
    }

    static inverse_scale(left: btVector3, right: btScalar.btScalar, out: btVector3) {
        out.m_floats[0] = left.m_floats[0] / right;
        out.m_floats[1] = left.m_floats[1] / right;
        out.m_floats[2] = left.m_floats[2] / right;
    }

    /**@brief Return the dot product
     * @param v The other vector in the dot product */
    dot(v: btVector3): btScalar.btScalar {
        return v.m_floats[0] * this.m_floats[0] + v.m_floats[1] * this.m_floats[1] + v.m_floats[2] * this.m_floats[2];
    }

    /**@brief Return the length of the vector squared */
    length2() {
        return this.dot(this)
    }

    /**@brief Return the length of the vector */
    length() {
        return btScalar.btSqrt(this.length2())
    }

    /**@brief Return the norm (length) of the vector */
    safeNorm() {
        let d = this.length2();
        if (d > btScalar.SIMD_EPSILON)
            return btScalar.btSqrt(d);
        return 0;
    }

    /**@brief Return the distance squared between the ends of this and another vector
     * This is systematically treating the vector like a point */
    distance2(v: btVector3) {

    }

    /**@brief Return the distance between the ends of this and another vector
     * This is systematically treating the vector like a point */
    distance(v: btVector3) {

    }

    safeNormalize() {
        let l2 = this.length2();
        // triNormal.normalize();
        if (l2 >= btScalar.SIMD_EPSILON * btScalar.SIMD_EPSILON) {
            this.inverse_scale(l2);
        } else {
            this.setValue(1, 0, 0);
        }
        return this;
    }

    /**@brief Normalize this vector
     * x^2 + y^2 + z^2 = 1 */
    normalize() {
        return this.inverse_scale(this.length());
    }

    /**@brief Return a normalized version of this vector */
    normalized() {

    }

    /**@brief Return a rotated version of this vector
     * @param wAxis The axis to rotate about
     * @param angle The angle to rotate by */
    rotate(wAxis: btVector3, angle: btScalar.btScalar) {

    }

    /**@brief Return the angle between this and another vector
     * @param v The other vector */
    angle(v: btVector3) {
        let s = btScalar.btSqrt(this.length2() * v.length2());
        return btScalar.btAcos(this.dot(v) / s);
    }

    setValue(_x: btScalar.btScalar, _y: btScalar.btScalar, _z: btScalar.btScalar) {
        this.m_floats[0] = _x;
        this.m_floats[1] = _y;
        this.m_floats[2] = _z;
        this.m_floats[3] = 0;
    }
}
