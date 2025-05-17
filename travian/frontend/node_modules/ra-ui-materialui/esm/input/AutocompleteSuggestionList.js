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
import classnames from 'classnames';
import { Paper, Popper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
var useStyles = makeStyles({
    suggestionsContainer: {
        zIndex: 2,
    },
    suggestionsPaper: {
        maxHeight: '50vh',
        overflowY: 'auto',
    },
}, { name: 'RaAutocompleteSuggestionList' });
var AutocompleteSuggestionList = function (props) {
    var children = props.children, className = props.className, isOpen = props.isOpen, menuProps = props.menuProps, inputEl = props.inputEl, suggestionsContainerProps = props.suggestionsContainerProps;
    var classes = useStyles(props);
    return (React.createElement(Popper, __assign({ open: isOpen, anchorEl: inputEl, className: classnames(classes.suggestionsContainer, className), modifiers: {} }, suggestionsContainerProps),
        React.createElement("div", __assign({}, (isOpen ? menuProps : {})),
            React.createElement(Paper, { square: true, style: {
                    marginTop: 8,
                    minWidth: inputEl ? inputEl.clientWidth : null,
                }, className: classes.suggestionsPaper }, children))));
};
export default AutocompleteSuggestionList;
