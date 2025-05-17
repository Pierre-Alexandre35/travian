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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { all, call, cancelled, put, select, takeEvery, } from 'redux-saga/effects';
import { FETCH_CANCEL, FETCH_END, FETCH_ERROR, FETCH_START } from '../actions';
import { fetchActionsWithRecordResponse, fetchActionsWithArrayOfIdentifiedRecordsResponse, fetchActionsWithArrayOfRecordsResponse, fetchActionsWithTotalResponse, sanitizeFetchType, } from '../core';
function validateResponseFormat(response, type, logger // eslint-disable-line no-console
) {
    if (logger === void 0) { logger = console.error; }
    if (!response.hasOwnProperty('data')) {
        logger("The response to '" + type + "' must be like { data: ... }, but the received response does not have a 'data' key. The dataProvider is probably wrong for '" + type + "'.");
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithArrayOfRecordsResponse.includes(type) &&
        !Array.isArray(response.data)) {
        logger("The response to '" + type + "' must be like { data : [...] }, but the received data is not an array. The dataProvider is probably wrong for '" + type + "'");
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithArrayOfIdentifiedRecordsResponse.includes(type) &&
        Array.isArray(response.data) &&
        response.data.length > 0 &&
        response.data.some(function (d) { return !d.hasOwnProperty('id'); })) {
        logger("The response to '" + type + "' must be like { data : [{ id: 123, ...}, ...] }, but at least one received data item do not have an 'id' key. The dataProvider is probably wrong for '" + type + "'");
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithRecordResponse.includes(type) &&
        !response.data.hasOwnProperty('id')) {
        logger("The response to '" + type + "' must be like { data: { id: 123, ... } }, but the received data does not have an 'id' key. The dataProvider is probably wrong for '" + type + "'");
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithTotalResponse.includes(type) &&
        !response.hasOwnProperty('total')) {
        logger("The response to '" + type + "' must be like  { data: [...], total: 123 }, but the received response does not have a 'total' key. The dataProvider is probably wrong for '" + type + "'");
        throw new Error('ra.notification.data_provider_error');
    }
}
export function handleFetch(dataProvider, action) {
    var type, payload, _a, fetchMeta, onSuccess, onFailure, meta, restType, successSideEffects, failureSideEffects, isOptimistic, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                type = action.type, payload = action.payload, _a = action.meta, fetchMeta = _a.fetch, onSuccess = _a.onSuccess, onFailure = _a.onFailure, meta = __rest(_a, ["fetch", "onSuccess", "onFailure"]);
                restType = fetchMeta;
                successSideEffects = onSuccess instanceof Function ? {} : onSuccess;
                failureSideEffects = onFailure instanceof Function ? {} : onFailure;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, 10, 14]);
                return [4 /*yield*/, select(function (state) { return state.admin.ui.optimistic; })];
            case 2:
                isOptimistic = _b.sent();
                if (isOptimistic) {
                    // in optimistic mode, all fetch actions are canceled,
                    // so the admin uses the store without synchronization
                    return [2 /*return*/];
                }
                return [4 /*yield*/, all([
                        put({ type: type + "_LOADING", payload: payload, meta: meta }),
                        put({ type: FETCH_START }),
                    ])];
            case 3:
                _b.sent();
                return [4 /*yield*/, call(dataProvider[sanitizeFetchType(restType)], meta.resource, payload)];
            case 4:
                response = _b.sent();
                if (process.env.NODE_ENV !== 'production') {
                    validateResponseFormat(response, restType);
                }
                return [4 /*yield*/, put({
                        type: type + "_SUCCESS",
                        payload: response,
                        requestPayload: payload,
                        meta: __assign(__assign(__assign({}, meta), successSideEffects), { fetchResponse: restType, fetchStatus: FETCH_END }),
                    })];
            case 5:
                _b.sent();
                return [4 /*yield*/, put({ type: FETCH_END })];
            case 6:
                _b.sent();
                return [3 /*break*/, 14];
            case 7:
                error_1 = _b.sent();
                return [4 /*yield*/, put({
                        type: type + "_FAILURE",
                        error: (error_1 && (error_1.message ? error_1.message : error_1)) || null,
                        payload: (error_1 && error_1.body) || null,
                        requestPayload: payload,
                        meta: __assign(__assign(__assign({}, meta), failureSideEffects), { fetchResponse: restType, fetchStatus: FETCH_ERROR }),
                    })];
            case 8:
                _b.sent();
                return [4 /*yield*/, put({ type: FETCH_ERROR, error: error_1 })];
            case 9:
                _b.sent();
                return [3 /*break*/, 14];
            case 10: return [4 /*yield*/, cancelled()];
            case 11:
                if (!_b.sent()) return [3 /*break*/, 13];
                return [4 /*yield*/, put({ type: FETCH_CANCEL })];
            case 12:
                _b.sent();
                return [2 /*return*/];
            case 13: return [7 /*endfinally*/];
            case 14: return [2 /*return*/];
        }
    });
}
export var takeFetchAction = function (action) { return action.meta && action.meta.fetch; };
var fetch = function (dataProvider) {
    return function watchFetch() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, takeEvery(takeFetchAction, handleFetch, dataProvider)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
};
export default fetch;
