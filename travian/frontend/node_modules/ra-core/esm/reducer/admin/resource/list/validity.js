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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { FETCH_END, REFRESH_VIEW } from '../../../../actions';
import { GET_LIST, CREATE } from '../../../../core';
var initialState = {};
var validityReducer = function (previousState, _a) {
    var _b;
    if (previousState === void 0) { previousState = initialState; }
    var type = _a.type, payload = _a.payload, requestPayload = _a.requestPayload, meta = _a.meta;
    if (type === REFRESH_VIEW) {
        return initialState;
    }
    if (!meta ||
        !meta.fetchResponse ||
        meta.fetchStatus !== FETCH_END ||
        meta.fromCache === true) {
        return previousState;
    }
    switch (meta.fetchResponse) {
        case GET_LIST: {
            if (payload.validUntil) {
                // store the validity date
                return __assign(__assign({}, previousState), (_b = {}, _b[JSON.stringify(requestPayload)] = payload.validUntil, _b));
            }
            else {
                // remove the validity date
                var _c = previousState, _d = JSON.stringify(requestPayload), value = _c[_d], rest = __rest(_c, [typeof _d === "symbol" ? _d : _d + ""]);
                return rest;
            }
        }
        case CREATE:
            // force refresh of all lists because we don't know where the
            // new record will appear in the list
            return initialState;
        default:
            return previousState;
    }
};
export default validityReducer;
