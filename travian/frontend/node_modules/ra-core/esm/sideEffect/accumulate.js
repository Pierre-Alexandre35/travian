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
import { cancel, delay, fork, put, takeEvery } from 'redux-saga/effects';
/**
 * Distinct reducer on ids
 *
 * @example
 * addIds([1, 2, 3], { payload: { ids: [3, 4] } })
 *   => [1, 2, 3, 4]
 */
var addIds = function (oldIds, _a) {
    var ids = _a.payload.ids;
    // Using a Set ensure we only keep distinct values
    var oldIdsSet = new Set(oldIds);
    ids.forEach(function (id) { return oldIdsSet.add(id); });
    return Array.from(oldIdsSet);
};
// We need a factory for this saga in order to unit test it by providing its context (current tasks and accumulations)
export var finalizeFactory = function (tasks, accumulations) {
    /**
     * Fetch the accumulated value after a delay
     *
     * As this gets canceled by subsequent calls to accumulate(), only the last
     * call to finalize() will not be canceled. The delay acts as a
     * debounce.
     *
     * @see https://redux-saga.js.org/docs/recipes/#debouncing
     */
    return function finalize(key, actionCreator) {
        var accumulatedValue, action;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // combined with cancel(), this debounces the calls
                return [4 /*yield*/, delay(50)];
                case 1:
                    // combined with cancel(), this debounces the calls
                    _a.sent();
                    accumulatedValue = accumulations[key];
                    // Remove the latest accumulated value so that they do not interfere with later calls
                    delete accumulations[key];
                    action = actionCreator(key, accumulatedValue);
                    return [4 /*yield*/, put(action)];
                case 2:
                    _a.sent();
                    delete tasks[key];
                    return [2 /*return*/];
            }
        });
    };
};
// We need a factory for this saga in order to unit test it by providing its context (current tasks and accumulations)
export var accumulateFactory = function (tasks, accumulations, finalize) {
    /**
     * Accumulate actions and eventually redispatch an action with the accumulated payload
     *
     * @example
     * accumulate({
     *    type: CRUD_GET_MANY_ACCUMULATE,
     *    payload: { ids: [1, 2, 3], resource: 'posts' },
     *    meta: { accumulate: crudGetMany }
     * });
     * accumulate({
     *    type: CRUD_GET_MANY_ACCUMULATE,
     *    payload: { ids: [4, 5], resource: 'posts' },
     *    meta: { accumulate: crudGetMany }
     * });
     *   => crudGetMany({ ids: [1, 2, 3, 4, 5], resource: 'posts' })
     *
     * @example
     * accumulate({
     *    type: CRUD_GET_MATCHING_ACCUMULATE,
     *    meta: {
     *      accumulate: crudGetMatching('posts', 'posts@comments[1].authorId', { page:1, perPage: 10 }, {field: 'id', order: 'DESC' }, {}),
     *      accumulateValues: () => true,
     *      accumulateKey: '{"resource":"authors", "pagination":{"page":1,"perPage":10},"sort":{"field":"id","order":"DESC"},"filter":{}}'
     *    }
     * });
     * accumulate({
     *    type: CRUD_GET_MATCHING_ACCUMULATE,
     *    meta: {
     *      accumulate: crudGetMatching('posts', 'posts@comments[1].authorId', { page:1, perPage: 10 }, {field: 'id', order: 'DESC' }, {}),
     *      accumulateValues: () => true,
     *      accumulateKey: '{"resource":"authors", "pagination":{"page":1,"perPage":10},"sort":{"field":"id","order":"DESC"},"filter":{}}'
     *    }
     * });
     *   => crudGetMatching('posts', 'posts@comments[1].authorId', { page:1, perPage: 10 }, {field: 'id', order: 'DESC' }, {})
     */
    return function accumulate(action) {
        var key, accumulateValues, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    key = action.meta.accumulateKey || action.payload.resource;
                    if (!tasks[key]) return [3 /*break*/, 2];
                    return [4 /*yield*/, cancel(tasks[key])];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2:
                    accumulateValues = action.meta.accumulateValues || addIds;
                    // accumulateValues is a reducer function, it receives the previous accumulatedValues for
                    // the provided key, and must return the updated accumulatedValues
                    accumulations[key] = accumulateValues(accumulations[key], action);
                    _a = tasks;
                    _b = key;
                    return [4 /*yield*/, fork(finalize, key, action.meta.accumulate)];
                case 3:
                    _a[_b] = _c.sent();
                    return [2 /*return*/];
            }
        });
    };
};
export default function () {
    var accumulations, tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accumulations = {};
                tasks = {};
                return [4 /*yield*/, takeEvery(function (action) { return action.meta && action.meta.accumulate; }, accumulateFactory(tasks, accumulations, finalizeFactory(tasks, accumulations)))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
