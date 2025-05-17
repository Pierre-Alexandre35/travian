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
import { useField } from 'react-final-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { useChoices } from 'ra-core';
var RadioButtonGroupInputItem = function (_a) {
    var choice = _a.choice, optionText = _a.optionText, optionValue = _a.optionValue, source = _a.source, translateChoice = _a.translateChoice, onChange = _a.onChange;
    var _b = useChoices({
        optionText: optionText,
        optionValue: optionValue,
        translateChoice: translateChoice,
    }), getChoiceText = _b.getChoiceText, getChoiceValue = _b.getChoiceValue;
    var label = getChoiceText(choice);
    var value = getChoiceValue(choice);
    var _c = useField(source, {
        type: 'radio',
        value: value,
    }).input, type = _c.type, inputProps = __rest(_c, ["type"]);
    var nodeId = source + "_" + value;
    return (React.createElement(FormControlLabel, { label: label, htmlFor: nodeId, control: React.createElement(Radio, __assign({ id: nodeId, color: "primary" }, inputProps, { onChange: function (_, isActive) { return isActive && onChange(value); } })) }));
};
export default RadioButtonGroupInputItem;
