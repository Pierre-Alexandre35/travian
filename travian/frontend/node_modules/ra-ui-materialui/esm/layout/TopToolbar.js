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
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        root: (_a = {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(1),
                minHeight: theme.spacing(5)
            },
            _a[theme.breakpoints.up('xs')] = {
                paddingLeft: 0,
                paddingRight: 0,
            },
            _a[theme.breakpoints.down('sm')] = {
                paddingRight: theme.spacing(2),
            },
            _a[theme.breakpoints.down('xs')] = {
                padding: theme.spacing(1),
                backgroundColor: theme.palette.background.paper,
            },
            _a),
    });
}, { name: 'RaTopToolbar' });
var TopToolbar = function (props) {
    var className = props.className, children = props.children, rest = __rest(props, ["className", "children"]);
    var classes = useStyles(props);
    return (React.createElement(Toolbar, __assign({ className: classnames(classes.root, className) }, rest), children));
};
TopToolbar.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
export default TopToolbar;
