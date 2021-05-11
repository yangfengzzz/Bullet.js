export function btMin<T>(a: T, b: T) {
    return a < b ? a : b;
}


export function btMax<T>(a: T, b: T) {
    return a > b ? a : b;
}

export function btClamped<T>(a: T, lb: T, ub: T) {
    return a < lb ? lb : (ub < a ? ub : a);
}

export function btSetMin<T>(a: T, b: T) {
    if (b < a) {
        a = b;
    }
}

export function btSetMax<T>(a: T, b: T) {
    if (a < b) {
        a = b;
    }
}

export function btClamp<T>(a: T, lb: T, ub: T) {
    if (a < lb) {
        a = lb;
    } else if (ub < a) {
        a = ub;
    }
}
