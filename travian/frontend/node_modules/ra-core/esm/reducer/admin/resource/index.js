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
import { REGISTER_RESOURCE, UNREGISTER_RESOURCE, REFRESH_VIEW, } from '../../../actions';
import data from './data';
import list from './list';
import validity from './validity';
var initialState = {};
export default (function (previousState, action) {
    var _a;
    if (previousState === void 0) { previousState = initialState; }
    if (action.type === REGISTER_RESOURCE) {
        var resourceState = {
            props: action.payload,
            data: data(undefined, action),
            list: list(undefined, action),
            validity: validity(undefined, action),
        };
        return __assign(__assign({}, previousState), (_a = {}, _a[action.payload.name] = resourceState, _a));
    }
    if (action.type === UNREGISTER_RESOURCE) {
        return Object.keys(previousState).reduce(function (acc, key) {
            var _a;
            if (key === action.payload) {
                return acc;
            }
            return __assign(__assign({}, acc), (_a = {}, _a[key] = previousState[key], _a));
        }, {});
    }
    if (action.type !== REFRESH_VIEW &&
        (!action.meta || !action.meta.resource)) {
        return previousState;
    }
    var resources = Object.keys(previousState);
    var newState = resources.reduce(function (acc, resource) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[resource] = action.type === REFRESH_VIEW ||
            action.meta.resource === resource
            ? {
                props: previousState[resource].props,
                data: data(previousState[resource].data, action),
                list: list(previousState[resource].list, action),
                validity: validity(previousState[resource].validity, action),
            }
            : previousState[resource], _a)));
    }, {});
    return newState;
});
export var getResources = function (state) {
    return Object.keys(state).map(function (key) { return state[key].props; });
};
export var getReferenceResource = function (state, props) { return state[props.reference]; };
