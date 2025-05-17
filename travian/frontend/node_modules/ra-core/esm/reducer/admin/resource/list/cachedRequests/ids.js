import { GET_LIST } from '../../../../../core';
var initialState = [];
var idsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    if (action.meta && action.meta.fetchResponse === GET_LIST) {
        return action.payload.data.map(function (_a) {
            var id = _a.id;
            return id;
        });
    }
    return previousState;
};
export default idsReducer;
