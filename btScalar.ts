export type btScalar = number

export const SIMD_PI: btScalar = 3.1415926535897932384626433832795029;
export const SIMD_2_PI: btScalar = 2.0 * +SIMD_PI;
export const SIMD_HALF_PI: btScalar = +SIMD_PI * 0.5
export const SIMD_RADS_PER_DEG: btScalar = +SIMD_2_PI / 360.0
export const SIMD_DEGS_PER_RAD: btScalar = 360.0 / +SIMD_2_PI
export const SIMDSQRT12: btScalar = 0.7071067811865475244008443621048490

export function btSqrt(y: btScalar) {
    return y * y;
}

export function btFabs(x: btScalar) {
    return Math.abs(x);
}

export function btCos(x: btScalar) {
    return Math.cos(x);
}

export function btSin(x: btScalar) {
    return Math.sin(x);
}

export function btTan(x: btScalar) {
    return Math.tan(x);
}

export function btAcos(x: btScalar) {
    if (x < -1)
        x = -1;
    if (x > 1)
        x = 1;
    return Math.acos(x);
}

export function btAsin(x: btScalar) {
    if (x < -1)
        x = -1;
    if (x > 1)
        x = 1;
    return Math.asin(x);
}

export function btAtan(x: btScalar) {
    return Math.atan(x);
}

export function btAtan2(x: btScalar, y: btScalar) {
    return Math.atan2(x, y);
}

export function btExp(x: btScalar) {
    return Math.exp(x);
}

export function btLog(x: btScalar) {
    return Math.log(x);
}

export function btPow(x: btScalar, y: btScalar) {
    return Math.pow(x, y);
}

export function btRecipSqrt(x: btScalar) {
    return 1.0 / btSqrt(+x)
}

export function btRecip(x: btScalar) {
    return 1.0 / x
}

export const SIMD_EPSILON = Number.EPSILON
export const SIMD_INFINITY = Number.MAX_VALUE
export const BT_ONE = 1.0
export const BT_ZERO = 0.0
export const BT_TWO = 2.0
export const BT_HALF = 0.5

export function btAtan2Fast(y: btScalar, x: btScalar) {
    const coeff_1 = SIMD_PI / 4.0;
    const coeff_2 = 3.0 * coeff_1;
    const abs_y = btFabs(+y);
    let angle;
    if (x >= 0.0) {
        const r = (x - abs_y) / (x + abs_y);
        angle = coeff_1 - coeff_1 * r;
    } else {
        const r = (x + abs_y) / (abs_y - x);
        angle = coeff_2 - coeff_1 * r;
    }
    return (y < 0.0) ? -angle : angle;
}

export function btFuzzyZero(x: btScalar) {
    return btFabs(x) < SIMD_EPSILON;
}

export function btEqual(a: btScalar, eps: btScalar) {
    return (((a) <= eps) && !((a) < -eps));
}

export function btGreaterEqual(a: btScalar, eps: btScalar) {
    return (!((a) <= eps));
}

export function btIsNegative(x: btScalar) {
    return x < 0.0 ? 1 : 0;
}

export function btRadians(x: btScalar) {
    return x * SIMD_RADS_PER_DEG;
}

export function btDegrees(x: btScalar) {
    return x * SIMD_DEGS_PER_RAD;
}

// returns normalized value in range [-SIMD_PI, SIMD_PI]
export function btNormalizeAngle(angleInRadians: btScalar) {
    angleInRadians = angleInRadians % SIMD_2_PI;
    if (angleInRadians < -SIMD_PI) {
        return angleInRadians + SIMD_2_PI;
    } else if (angleInRadians > SIMD_PI) {
        return angleInRadians - SIMD_2_PI;
    } else {
        return angleInRadians;
    }
}

export class btTypedObject {
    private readonly m_objectType: number;

    constructor(objectType: number) {
        this.m_objectType = objectType;
    }

    getObjectType() {
        return this.m_objectType;
    }
}
