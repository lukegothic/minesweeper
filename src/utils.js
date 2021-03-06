export const Range = (start, stop, step = 1) => Array.from({ length: (stop - start + 1) / step }, (_, i) => start + (i * step));
export const Random = (min, max) => {
    if (!max) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
}
export const RandomInt = (min, max, inclusive) => {
    if (!max) {
        max = min;
        min = 0;
    } else if (typeof max === "boolean") {
        inclusive = max;
        max = min;
        min = 0;
    }
    return Math.floor(Random(Math.ceil(min), Math.floor(max + (inclusive ? 1 : 0))));
}
