export var rgba = function (r, g, b, a) {
    var isInRange = [r, g, b, a].every(function (num) { return (num >= 0 && num <= 255); });
    if (!isInRange) {
        throw Error('Color value not in range (0..255)');
    }
    return [r / 255, g / 255, b / 255, a / 255];
};
export default {
    rgba: rgba,
};
//# sourceMappingURL=color.js.map