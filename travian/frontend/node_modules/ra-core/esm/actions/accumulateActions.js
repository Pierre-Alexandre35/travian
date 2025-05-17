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
import { crudGetMany, crudGetMatching } from './dataActions';
export var CRUD_GET_MANY_ACCUMULATE = 'RA/CRUD_GET_MANY_ACCUMULATE';
export var crudGetManyAccumulate = function (resource, ids) { return ({
    type: CRUD_GET_MANY_ACCUMULATE,
    payload: { resource: resource, ids: ids },
    meta: { accumulate: crudGetMany },
}); };
export var CRUD_GET_MATCHING_ACCUMULATE = 'RA/CRUD_GET_MATCHING_ACCUMULATE';
export var crudGetMatchingAccumulate = function (reference, relatedTo, pagination, sort, filter) {
    var action = crudGetMatching(reference, relatedTo, pagination, sort, filter);
    return {
        type: CRUD_GET_MATCHING_ACCUMULATE,
        meta: {
            accumulate: function () { return action; },
            accumulateValues: function () { return true; },
            accumulateKey: JSON.stringify(__assign({ resource: reference, relatedTo: relatedTo }, action.payload)),
        },
    };
};
