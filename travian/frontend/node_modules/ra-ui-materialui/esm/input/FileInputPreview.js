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
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import { useTranslate } from 'ra-core';
var useStyles = makeStyles(function (theme) { return ({
    removeButton: {},
    removeIcon: {
        color: theme.palette.error.main,
    },
}); }, { name: 'RaFileInputPreview' });
var FileInputPreview = function (props) {
    var children = props.children, classesOverride = props.classes, className = props.className, onRemove = props.onRemove, file = props.file, rest = __rest(props, ["children", "classes", "className", "onRemove", "file"]);
    var classes = useStyles(props);
    var translate = useTranslate();
    useEffect(function () {
        return function () {
            var preview = file.rawFile ? file.rawFile.preview : file.preview;
            if (preview) {
                window.URL.revokeObjectURL(preview);
            }
        };
    }, [file]);
    return (React.createElement("div", __assign({ className: className }, rest),
        React.createElement(IconButton, { className: classes.removeButton, onClick: onRemove, "aria-label": translate('ra.action.delete'), title: translate('ra.action.delete') },
            React.createElement(RemoveCircle, { className: classes.removeIcon })),
        children));
};
FileInputPreview.propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    file: PropTypes.object,
    onRemove: PropTypes.func.isRequired,
};
FileInputPreview.defaultProps = {
    file: undefined,
};
export default FileInputPreview;
