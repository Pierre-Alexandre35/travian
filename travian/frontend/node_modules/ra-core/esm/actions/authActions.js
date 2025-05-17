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
export var USER_LOGIN = 'RA/USER_LOGIN';
export var USER_LOGIN_LOADING = 'RA/USER_LOGIN_LOADING';
export var USER_LOGIN_FAILURE = 'RA/USER_LOGIN_FAILURE';
export var USER_LOGIN_SUCCESS = 'RA/USER_LOGIN_SUCCESS';
export var userLogin = function (payload, pathName) { return ({
    type: USER_LOGIN,
    payload: payload,
    meta: { auth: true, pathName: pathName },
}); };
export var USER_CHECK = 'RA/USER_CHECK';
export var USER_CHECK_SUCCESS = 'RA/USER_CHECK_SUCCESS';
export var userCheck = function (payload, pathName, routeParams) {
    if (routeParams === void 0) { routeParams = {}; }
    return ({
        type: USER_CHECK,
        payload: __assign(__assign({}, payload), { routeParams: routeParams }),
        meta: { auth: true, pathName: pathName },
    });
};
export var USER_LOGOUT = 'RA/USER_LOGOUT';
/**
 * Action to trigger logout of the current user. The entire redux state will be cleared
 * thanks to the resettableAppReducer in Admin.
 * @see: Admin.js
 * @param redirectTo Path to direct to after logout
 * @return {{type: string, payload: {redirectTo: string}, meta: {auth: boolean}}}
 */
export var userLogout = function (redirectTo) { return ({
    type: USER_LOGOUT,
    payload: { redirectTo: redirectTo },
    meta: { auth: true },
}); };
