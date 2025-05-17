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
import { warning } from 'ra-core';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
var useStyles = makeStyles({
    cardActions: {
        zIndex: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        padding: 0,
    },
}, { name: 'RaCardActions' });
var CardActions = function (props) {
    var classesOverride = props.classes, className = props.className, children = props.children, rest = __rest(props, ["classes", "className", "children"]);
    warning(true, '<CardActions> is deprecated. Please use the <TopToolbar> component instead to wrap your action buttons');
    var classes = useStyles(props);
    return (React.createElement("div", __assign({ className: classnames(classes.cardActions, className) }, rest), children));
};
CardActions.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
export default CardActions;
