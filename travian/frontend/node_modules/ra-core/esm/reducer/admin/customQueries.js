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
// reducer for queries called via useQueryWithStore and without a custom action name
var customQueriesReducer = function (previousState, _a) {
    var _b;
    if (previousState === void 0) { previousState = {}; }
    var type = _a.type, requestPayload = _a.requestPayload, payload = _a.payload, meta = _a.meta;
    if (type !== 'CUSTOM_QUERY_SUCCESS') {
        return previousState;
    }
    var key = JSON.stringify({
        type: meta.fetchResponse,
        resource: meta.resource,
        payload: requestPayload,
    });
    return __assign(__assign({}, previousState), (_b = {}, _b[key] = payload, _b));
};
export default customQueriesReducer;
