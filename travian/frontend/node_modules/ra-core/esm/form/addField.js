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
import FormField from './FormField';
export default (function (BaseComponent, fieldProps) {
    if (fieldProps === void 0) { fieldProps = {}; }
    var WithFormField = function (props) { return (React.createElement(FormField, __assign({ component: BaseComponent }, fieldProps, props))); };
    return WithFormField;
});
