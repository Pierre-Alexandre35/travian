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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useChoices } from 'ra-core';
var useStyles = makeStyles({
    checkbox: {
        height: 32,
    },
}, { name: 'RaCheckboxGroupInputItem' });
var CheckboxGroupInputItem = function (props) {
    var classesOverride = props.classes, id = props.id, choice = props.choice, onChange = props.onChange, optionText = props.optionText, optionValue = props.optionValue, options = props.options, translateChoice = props.translateChoice, value = props.value, rest = __rest(props, ["classes", "id", "choice", "onChange", "optionText", "optionValue", "options", "translateChoice", "value"]);
    var classes = useStyles(props);
    var _a = useChoices({
        optionText: optionText,
        optionValue: optionValue,
        translateChoice: translateChoice,
    }), getChoiceText = _a.getChoiceText, getChoiceValue = _a.getChoiceValue;
    var choiceName = getChoiceText(choice);
    return (React.createElement(FormControlLabel, { htmlFor: id + "_" + getChoiceValue(choice), key: getChoiceValue(choice), onChange: onChange, control: React.createElement(Checkbox, __assign({ id: id + "_" + getChoiceValue(choice), color: "primary", className: classes.checkbox, checked: value
                ? value.find(function (v) { return v == getChoiceValue(choice); }) !== // eslint-disable-line eqeqeq
                    undefined
                : false, value: String(getChoiceValue(choice)) }, options, rest)), label: choiceName }));
};
export default CheckboxGroupInputItem;
