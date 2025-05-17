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
import { take, takeEvery, put, race } from 'redux-saga/effects';
import { showNotification } from '../actions/notificationActions';
import { UNDOABLE, UNDO, COMPLETE, startOptimisticMode, stopOptimisticMode, } from '../actions/undoActions';
import { refreshView } from '../actions/uiActions';
export function handleUndoRace(undoableAction) {
    var action, _a, onSuccess, onFailure, metaWithoutSideEffects, complete;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                action = undoableAction.payload.action;
                _a = action.meta, onSuccess = _a.onSuccess, onFailure = _a.onFailure, metaWithoutSideEffects = __rest(_a, ["onSuccess", "onFailure"]);
                return [4 /*yield*/, put(startOptimisticMode())];
            case 1:
                _b.sent();
                // dispatch action in optimistic mode (no fetch), with success side effects
                return [4 /*yield*/, put(__assign(__assign({}, action), { type: action.type + "_OPTIMISTIC", meta: __assign(__assign(__assign({}, metaWithoutSideEffects), onSuccess), { optimistic: true }) }))];
            case 2:
                // dispatch action in optimistic mode (no fetch), with success side effects
                _b.sent();
                return [4 /*yield*/, race({
                        undo: take(UNDO),
                        complete: take(COMPLETE),
                    })];
            case 3:
                complete = (_b.sent()).complete;
                return [4 /*yield*/, put(stopOptimisticMode())];
            case 4:
                _b.sent();
                if (!complete) return [3 /*break*/, 6];
                // if not cancelled, redispatch the action, this time immediate, and without success side effect
                return [4 /*yield*/, put(__assign(__assign({}, action), { meta: __assign(__assign({}, metaWithoutSideEffects), { onSuccess: { refresh: true }, onFailure: __assign(__assign({}, onFailure), { refresh: true }) }) }))];
            case 5:
                // if not cancelled, redispatch the action, this time immediate, and without success side effect
                _b.sent();
                return [3 /*break*/, 9];
            case 6: return [4 /*yield*/, put(showNotification('ra.notification.canceled'))];
            case 7:
                _b.sent();
                return [4 /*yield*/, put(refreshView())];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}
export default function watchUndoable() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // @ts-ignore
            return [4 /*yield*/, takeEvery(UNDOABLE, handleUndoRace)];
            case 1:
                // @ts-ignore
                _a.sent();
                return [2 /*return*/];
        }
    });
}
