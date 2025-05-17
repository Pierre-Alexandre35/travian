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
import * as React from 'react';
import { CoreAdminUI } from 'ra-core';
import { Layout as DefaultLayout, LoadingPage, Login, Logout, NotFound, } from 'ra-ui-materialui';
var AdminUI = function (props) { return React.createElement(CoreAdminUI, __assign({}, props)); };
AdminUI.defaultProps = {
    layout: DefaultLayout,
    catchAll: NotFound,
    loading: LoadingPage,
    loginPage: Login,
    logout: Logout,
};
export default AdminUI;
