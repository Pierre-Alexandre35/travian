import { GET_LIST } from '../../../../../core';
var initialState = null;
var totalReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    if (action.meta && action.meta.fetchResponse === GET_LIST) {
        return action.payload.total;
    }
    return previousState;
};
export default totalReducer;
