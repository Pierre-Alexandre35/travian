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
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'ra-core';
import TextInput from './TextInput';
var useStyles = makeStyles({
    input: {
        marginTop: 32,
    },
}, { name: 'RaSearchInput' });
var SearchInput = function (props) {
    var classesOverride = props.classes, rest = __rest(props, ["classes"]);
    var translate = useTranslate();
    var classes = useStyles(props);
    if (props.label) {
        throw new Error("<SearchInput> isn't designed to be used with a label prop. Use <TextInput> if you need a label.");
    }
    return (React.createElement(TextInput, __assign({ hiddenLabel: true, label: "", resettable: true, placeholder: translate('ra.action.search'), InputProps: {
            endAdornment: (React.createElement(InputAdornment, { position: "end" },
                React.createElement(SearchIcon, { color: "disabled" }))),
        }, className: classes.input }, rest)));
};
SearchInput.propTypes = {
    classes: PropTypes.object,
};
export default SearchInput;
