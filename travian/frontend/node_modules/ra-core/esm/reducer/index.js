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
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import admin, { getResources as adminGetResources, getReferenceResource as adminGetReferenceResource, getPossibleReferenceValues as adminGetPossibleReferenceValues, } from './admin';
export { getNotification } from './admin/notifications';
export default (function (customReducers, history) {
    return combineReducers(__assign({ admin: admin, router: connectRouter(history) }, customReducers));
});
export var getPossibleReferenceValues = function (state, props) {
    return adminGetPossibleReferenceValues(state.admin, props);
};
export var getResources = function (state) { return adminGetResources(state.admin); };
export var getReferenceResource = function (state, props) {
    return adminGetReferenceResource(state.admin, props);
};
export { getPossibleReferences } from './admin';
