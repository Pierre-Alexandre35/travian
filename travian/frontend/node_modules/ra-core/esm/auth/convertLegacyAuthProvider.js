import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, } from './types';
/**
 * Turn a function-based authProvider to an object-based one
 *
 * Allows using legacy authProviders transparently.
 *
 * @param {Function} legacyAuthProvider A legacy authProvider (type, params) => Promise<any>
 *
 * @returns {Object} An authProvider that react-admin can use
 */
export default (function (legacyAuthProvider) {
    var authProvider = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return legacyAuthProvider.apply(null, args);
    };
    authProvider.login = function (params) { return legacyAuthProvider(AUTH_LOGIN, params); };
    authProvider.logout = function (params) { return legacyAuthProvider(AUTH_LOGOUT, params); };
    authProvider.checkAuth = function (params) { return legacyAuthProvider(AUTH_CHECK, params); };
    authProvider.checkError = function (error) { return legacyAuthProvider(AUTH_ERROR, error); };
    authProvider.getPermissions = function (params) {
        return legacyAuthProvider(AUTH_GET_PERMISSIONS, params);
    };
    return authProvider;
});
