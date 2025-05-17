import { GET_LIST } from '../../../../../core';
var initialState = null;
var validityReducer = function (previousState, _a) {
    if (previousState === void 0) { previousState = initialState; }
    var payload = _a.payload, meta = _a.meta;
    switch (meta.fetchResponse) {
        case GET_LIST: {
            if (payload.validUntil) {
                // store the validity date
                return payload.validUntil;
            }
            else {
                // remove the validity date
                return initialState;
            }
        }
        default:
            return previousState;
    }
};
export default validityReducer;
