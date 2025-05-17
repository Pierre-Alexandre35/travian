import { CRUD_CHANGE_LIST_PARAMS, } from '../../../../actions/listActions';
var defaultState = {
    sort: null,
    order: null,
    page: 1,
    perPage: null,
    filter: {},
};
var paramsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = defaultState; }
    switch (action.type) {
        case CRUD_CHANGE_LIST_PARAMS:
            return action.payload;
        default:
            return previousState;
    }
};
export default paramsReducer;
