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
import { FETCH_END, REFRESH_VIEW } from '../../../actions';
import { CREATE, DELETE, DELETE_MANY, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, UPDATE, UPDATE_MANY, } from '../../../core';
var initialState = {};
var validityReducer = function (previousState, _a) {
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
    if (payload.validUntil) {
        // store the validity date
        switch (meta.fetchResponse) {
            case GET_LIST:
            case GET_MANY:
            case GET_MANY_REFERENCE:
                return addIds(payload.data.map(function (record) { return record.id; }), payload.validUntil, previousState);
            case UPDATE_MANY:
                return addIds(payload.data, payload.validUntil, previousState);
            case UPDATE:
            case CREATE:
            case GET_ONE:
                return addIds([payload.data.id], payload.validUntil, previousState);
            case DELETE:
            case DELETE_MANY:
                throw new Error('Responses to dataProvider.delete() or dataProvider.deleteMany() should not contain a validUntil param');
            default:
                return previousState;
        }
    }
    else {
        // remove the validity date
        switch (meta.fetchResponse) {
            case GET_LIST:
            case GET_MANY:
            case GET_MANY_REFERENCE:
                return removeIds(payload.data.map(function (record) { return record.id; }), previousState);
            case UPDATE:
            case CREATE:
            case GET_ONE:
                return removeIds([payload.data.id], previousState);
            case UPDATE_MANY:
                return removeIds(payload.data, previousState);
            case DELETE:
                return removeIds([requestPayload.id], previousState);
            case DELETE_MANY:
                return removeIds(requestPayload.ids, previousState);
            default:
                return previousState;
        }
    }
};
var addIds = function (ids, validUntil, oldValidityRegistry) {
    if (ids === void 0) { ids = []; }
    var validityRegistry = __assign({}, oldValidityRegistry);
    ids.forEach(function (id) {
        validityRegistry[id] = validUntil;
    });
    return validityRegistry;
};
var removeIds = function (ids, oldValidityRegistry) {
    if (ids === void 0) { ids = []; }
    var validityRegistry = __assign({}, oldValidityRegistry);
    ids.forEach(function (id) {
        delete validityRegistry[id];
    });
    return validityRegistry;
};
export default validityReducer;
