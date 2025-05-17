var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export default function getFormInitialValues(initialValues, defaultValue, record) {
    var finalInitialValues = __assign(__assign({}, initialValues), record);
    if (typeof defaultValue !== 'undefined') {
        console.warn('"defaultValue" is deprecated, please use "initialValues" instead');
    }
    if (typeof defaultValue === 'object') {
        finalInitialValues = __assign(__assign({}, defaultValue), finalInitialValues);
    }
    else if (typeof defaultValue === 'function') {
        finalInitialValues = __assign(__assign({}, defaultValue(record)), finalInitialValues);
    }
    return finalInitialValues;
}
