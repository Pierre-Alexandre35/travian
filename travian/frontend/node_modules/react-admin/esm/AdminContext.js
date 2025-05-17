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
import { CoreAdminContext } from 'ra-core';
import defaultI18nProvider from './defaultI18nProvider';
var AdminContext = function (props) { return (React.createElement(CoreAdminContext, __assign({}, props))); };
AdminContext.defaultProps = {
    i18nProvider: defaultI18nProvider,
};
AdminContext.displayName = 'AdminContext';
export default AdminContext;
