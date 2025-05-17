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
import { shallowEqual } from 'react-redux';
var isObject = function (obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]';
};
var isEmpty = function (obj) {
    return obj instanceof Date
        ? false
        : obj === '' ||
            obj === null ||
            obj === undefined ||
            shallowEqual(obj, {});
};
var removeEmpty = function (object) {
    return Object.keys(object).reduce(function (acc, key) {
        var _a;
        var child = object[key];
        if (isObject(object[key])) {
            child = removeEmpty(object[key]);
        }
        return isEmpty(child) ? acc : __assign(__assign({}, acc), (_a = {}, _a[key] = child, _a));
    }, {});
};
export default removeEmpty;
