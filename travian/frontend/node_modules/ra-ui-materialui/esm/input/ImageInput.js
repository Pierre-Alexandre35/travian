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
import { makeStyles } from '@material-ui/core/styles';
import FileInput from './FileInput';
var useStyles = makeStyles(function (theme) { return ({
    root: { width: '100%' },
    dropZone: {
        background: theme.palette.background.default,
        cursor: 'pointer',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
    preview: {
        display: 'inline-block',
    },
    removeButton: {
        display: 'inline-block',
        position: 'relative',
        float: 'left',
        '& button': {
            position: 'absolute',
            top: theme.spacing(1),
            right: theme.spacing(1),
            minWidth: theme.spacing(2),
            opacity: 0,
        },
        '&:hover button': {
            opacity: 1,
        },
    },
}); }, { name: 'RaImageInput' });
var ImageInput = function (props) {
    var classes = useStyles(props);
    return (React.createElement(FileInput, __assign({ labelMultiple: "ra.input.image.upload_several", labelSingle: "ra.input.image.upload_single", classes: classes }, props)));
};
export default ImageInput;
