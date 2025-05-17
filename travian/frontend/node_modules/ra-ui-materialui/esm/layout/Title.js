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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { cloneElement } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useTranslate, warning } from 'ra-core';
var Title = function (_a) {
    var className = _a.className, defaultTitle = _a.defaultTitle, record = _a.record, title = _a.title, rest = __rest(_a, ["className", "defaultTitle", "record", "title"]);
    var translate = useTranslate();
    var container = typeof document !== 'undefined'
        ? document.getElementById('react-admin-title')
        : null;
    if (!container)
        return null;
    warning(!defaultTitle && !title, 'Missing title prop in <Title> element');
    var titleElement = !title ? (React.createElement("span", __assign({ className: className }, rest), defaultTitle)) : typeof title === 'string' ? (React.createElement("span", __assign({ className: className }, rest), translate(title, { _: title }))) : (cloneElement(title, __assign({ className: className, record: record }, rest)));
    return createPortal(titleElement, container);
};
export var TitlePropType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
]);
Title.propTypes = {
    defaultTitle: PropTypes.string,
    className: PropTypes.string,
    record: PropTypes.any,
    title: TitlePropType,
};
export default Title;
