import * as btScalar from "./btScalar"
import * as btMinMax from "./btMinMax"

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
        return minus(v, this).length2()
    }

    /**@brief Return the distance between the ends of this and another vector
     * This is systematically treating the vector like a point */
    distance(v: btVector3) {
        return minus(v, this).length()
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
        let nrm = this;

        return nrm.normalize();
    }

    /**@brief Return a rotated version of this vector
     * @param wAxis The axis to rotate about
     * @param angle The angle to rotate by */
    rotate(wAxis: btVector3, angle: btScalar.btScalar) {
        let o = scale(wAxis, wAxis.dot(this));
        let _x = minus(this, o);
        let _y;

        _y = wAxis.cross(this);

        return add(add(o, scale(_x, btScalar.btCos(angle))), scale(_y, btScalar.btSin(angle)));
    }

    /**@brief Return the angle between this and another vector
     * @param v The other vector */
    angle(v: btVector3) {
        let s = btScalar.btSqrt(this.length2() * v.length2());
        return btScalar.btAcos(this.dot(v) / s);
    }

    /**@brief Return a vector with the absolute values of each element */
    absolute() {
        return new btVector3(btScalar.btFabs(this.m_floats[0]),
            btScalar.btFabs(this.m_floats[1]), btScalar.btFabs(this.m_floats[2]));
    }

    /**@brief Return the cross product between this and another vector
     * @param v The other vector */
    cross(v: btVector3) {
        return new btVector3(this.m_floats[1] * v.m_floats[2] - this.m_floats[2] * v.m_floats[1],
            this.m_floats[2] * v.m_floats[0] - this.m_floats[0] * v.m_floats[2],
            this.m_floats[0] * v.m_floats[1] - this.m_floats[1] * v.m_floats[0]);
    }

    triple(v1: btVector3, v2: btVector3) {
        return this.m_floats[0] * (v1.m_floats[1] * v2.m_floats[2] - v1.m_floats[2] * v2.m_floats[1]) +
            this.m_floats[1] * (v1.m_floats[2] * v2.m_floats[0] - v1.m_floats[0] * v2.m_floats[2]) +
            this.m_floats[2] * (v1.m_floats[0] * v2.m_floats[1] - v1.m_floats[1] * v2.m_floats[0]);
    }

    /**@brief Return the axis with the smallest value
     * Note return values are 0,1,2 for x, y, or z */
    minAxis() {
        return this.m_floats[0] < this.m_floats[1] ? (this.m_floats[0] < this.m_floats[2] ? 0 : 2)
            : (this.m_floats[1] < this.m_floats[2] ? 1 : 2);
    }

    /**@brief Return the axis with the largest value
     * Note return values are 0,1,2 for x, y, or z */
    maxAxis() {
        return this.m_floats[0] < this.m_floats[1] ? (this.m_floats[1] < this.m_floats[2] ? 2 : 1)
            : (this.m_floats[0] < this.m_floats[2] ? 2 : 0);
    }

    furthestAxis() {
        return this.absolute().minAxis();
    }

    closestAxis() {
        return this.absolute().maxAxis();
    }

    setInterpolate3(v0: btVector3, v1: btVector3, rt: btScalar.btScalar) {
        let s = 1.0 - rt;
        this.m_floats[0] = s * v0.m_floats[0] + rt * v1.m_floats[0];
        this.m_floats[1] = s * v0.m_floats[1] + rt * v1.m_floats[1];
        this.m_floats[2] = s * v0.m_floats[2] + rt * v1.m_floats[2];
    }

    /**@brief Return the linear interpolation between this and another vector
     * @param v The other vector
     * @param t The ration of this to v (t = 0 => return this, t=1 => return other) */
    lerp(v: btVector3, t: btScalar.btScalar) {
        return new btVector3(this.m_floats[0] + (v.m_floats[0] - this.m_floats[0]) * t,
            this.m_floats[1] + (v.m_floats[1] - this.m_floats[1]) * t,
            this.m_floats[2] + (v.m_floats[2] - this.m_floats[2]) * t);
    }

    /**@brief Elementwise multiply this vector by the other
     * @param v The other vector */
    eleMul(v: btVector3) {
        this.m_floats[0] *= v.m_floats[0];
        this.m_floats[1] *= v.m_floats[1];
        this.m_floats[2] *= v.m_floats[2];
    }

    /**@brief Return the x value */
    getX() {
        return this.m_floats[0];
    }

    /**@brief Return the y value */
    getY() {
        return this.m_floats[1];
    }

    /**@brief Return the z value */
    getZ() {
        return this.m_floats[2];
    }

    /**@brief Set the x value */
    setX(_x: btScalar.btScalar) {
        this.m_floats[0] = _x;
    };

    /**@brief Set the y value */
    setY(_y: btScalar.btScalar) {
        this.m_floats[1] = _y;
    };

    /**@brief Set the z value */
    setZ(_z: btScalar.btScalar) {
        this.m_floats[2] = _z;
    };

    /**@brief Set the w value */
    setW(_w: btScalar.btScalar) {
        this.m_floats[3] = _w;
    };

    /**@brief Return the x value */
    x() {
        return this.m_floats[0];
    }

    /**@brief Return the y value */
    y() {
        return this.m_floats[1];
    }

    /**@brief Return the z value */
    z() {
        return this.m_floats[2];
    }

    /**@brief Return the w value */
    w() {
        return this.m_floats[3];
    }

    equal(other: btVector3) {
        return ((this.m_floats[3] == other.m_floats[3]) && (this.m_floats[2] == other.m_floats[2]) &&
            (this.m_floats[1] == other.m_floats[1]) && (this.m_floats[0] == other.m_floats[0]));
    }

    unequal(other: btVector3) {
        return !(this.equal(other))
    }

    /**@brief Set each element to the max of the current values and the values of another btVector3
     * @param other The other btVector3 to compare with
     */
    setMax(other: btVector3) {
        btMinMax.btSetMax(this.m_floats[0], other.m_floats[0]);
        btMinMax.btSetMax(this.m_floats[1], other.m_floats[1]);
        btMinMax.btSetMax(this.m_floats[2], other.m_floats[2]);
        btMinMax.btSetMax(this.m_floats[3], other.w());
    }

    /**@brief Set each element to the min of the current values and the values of another btVector3
     * @param other The other btVector3 to compare with
     */
    setMin(other: btVector3) {
        btMinMax.btSetMin(this.m_floats[0], other.m_floats[0]);
        btMinMax.btSetMin(this.m_floats[1], other.m_floats[1]);
        btMinMax.btSetMin(this.m_floats[2], other.m_floats[2]);
        btMinMax.btSetMin(this.m_floats[3], other.w());
    }

    setValue(_x: btScalar.btScalar, _y: btScalar.btScalar, _z: btScalar.btScalar) {
        this.m_floats[0] = _x;
        this.m_floats[1] = _y;
        this.m_floats[2] = _z;
        this.m_floats[3] = 0;
    }

    getSkewSymmetricMatrix(v0: btVector3, v1: btVector3, v2: btVector3) {
        v0.setValue(0., -this.z(), this.y());
        v1.setValue(this.z(), 0., -this.x());
        v2.setValue(-this.y(), this.x(), 0.);
    }

    setZero() {
        this.setValue(0., 0., 0.);
    }

    isZero() {
        return this.m_floats[0] == 0 && this.m_floats[1] == 0 && this.m_floats[2] == 0;
    }

    fuzzyZero() {
        return this.length2() < btScalar.SIMD_EPSILON * btScalar.SIMD_EPSILON;
    }

    /**@brief returns index of maximum dot product between this and vectors in array[]
     * @param array The other vectors
     * @param array_count The number of other vectors
     * @param dotOut The maximum dot product */
    maxDot(array: btVector3[], array_count: number, dotOut: btScalar.btScalar) {
        let maxDot1 = -btScalar.SIMD_INFINITY;
        let i = 0;
        let ptIndex = -1;
        for (i = 0; i < array_count; i++) {
            let dot = array[i].dot(this);

            if (dot > maxDot1) {
                maxDot1 = dot;
                ptIndex = i;
            }
        }

        dotOut = maxDot1;
        return ptIndex;
    }

    /**@brief returns index of minimum dot product between this and vectors in array[]
     * @param array The other vectors
     * @param array_count The number of other vectors
     * @param dotOut The minimum dot product */
    minDot(array: btVector3[], array_count: number, dotOut: btScalar.btScalar) {
        let minDot = btScalar.SIMD_INFINITY;
        let i = 0;
        let ptIndex = -1;

        for (i = 0; i < array_count; i++) {
            let dot = array[i].dot(this);

            if (dot < minDot) {
                minDot = dot;
                ptIndex = i;
            }
        }

        dotOut = minDot;

        return ptIndex;
    }

    /* create a vector as  btVector3( this->dot( btVector3 v0 ), this->dot( btVector3 v1), this->dot( btVector3 v2 ))  */
    dot3(v0: btVector3, v1: btVector3, v2: btVector3) {
        return new btVector3(this.dot(v0), this.dot(v1), this.dot(v2));
    }
}

/**@brief Return the sum of two vectors (Point semantics)*/
function add(v1: btVector3, v2: btVector3) {
    return new btVector3(v1.m_floats[0] + v2.m_floats[0], v1.m_floats[1] + v2.m_floats[1], v1.m_floats[2] + v2.m_floats[2]);
}

/**@brief Return the elementwise product of two vectors */
function eleMul(v1: btVector3, v2: btVector3) {
    return new btVector3(v1.m_floats[0] * v2.m_floats[0], v1.m_floats[1] * v2.m_floats[1], v1.m_floats[2] * v2.m_floats[2]);
}

/**@brief Return the difference between two vectors */
function minus(v1: btVector3, v2: btVector3) {
    return new btVector3(v1.m_floats[0] - v2.m_floats[0], v1.m_floats[1] - v2.m_floats[1], v1.m_floats[2] - v2.m_floats[2]);
}

/**@brief Return the negative of the vector */
function negative(v: btVector3) {
    return new btVector3(-v.m_floats[0], -v.m_floats[1], -v.m_floats[2]);
}

/**@brief Return the vector scaled by s */
function scale(s: btScalar.btScalar | btVector3, v: btVector3 | btScalar.btScalar) {
    if (s instanceof btVector3 && typeof v == "number") {
        return new btVector3(s.m_floats[0] * v, s.m_floats[1] * v, s.m_floats[2] * v);
    } else if (typeof s == "number" && v instanceof btVector3) {
        return new btVector3(v.m_floats[0] * s, v.m_floats[1] * s, v.m_floats[2] * s);
    }
}

/**@brief Return the vector inversely scaled by s */
function inverse_scale(v: btVector3, s: btScalar.btScalar) {
    return scale(v, 1.0 / s);
}

/**@brief Return the vector inversely scaled by v2 */
function mulDivide(v1: btVector3, v2: btVector3) {
    return new btVector3(v1.m_floats[0] / v2.m_floats[0], v1.m_floats[1] / v2.m_floats[1], v1.m_floats[2] / v2.m_floats[2]);
}

/**@brief Return the dot product between two vectors */
function btDot(v1: btVector3, v2: btVector3) {
    return v1.dot(v2);
}

/**@brief Return the distance squared between two vectors */
function btDistance2(v1: btVector3, v2: btVector3) {
    return v1.distance2(v2);
}

/**@brief Return the distance between two vectors */
function btDistance(v1: btVector3, v2: btVector3) {
    return v1.distance(v2);
}

/**@brief Return the angle between two vectors */
function btAngle(v1: btVector3, v2: btVector3) {
    return v1.angle(v2);
}

/**@brief Return the cross product of two vectors */
function btCross(v1: btVector3, v2: btVector3) {
    return v1.cross(v2);
}

function btTriple(v1: btVector3, v2: btVector3, v3: btVector3) {
    return v1.triple(v2, v3);
}

/**@brief Return the linear interpolation between two vectors
 * @param v1 One vector
 * @param v2 The other vector
 * @param t The ration of this to v (t = 0 => return v1, t=1 => return v2) */
function lerp(v1: btVector3, v2: btVector3, t: btScalar.btScalar) {
    return v1.lerp(v2, t);
}

