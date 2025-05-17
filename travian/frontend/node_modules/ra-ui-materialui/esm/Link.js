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
import classNames from 'classnames';
import { Link as RRLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
var useStyles = makeStyles(function (theme) { return ({
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
}); }, { name: 'RaLink' });
var Link = function (props) {
    var to = props.to, children = props.children, classesOverride = props.classes, className = props.className, rest = __rest(props, ["to", "children", "classes", "className"]);
    var classes = useStyles(props);
    return (React.createElement(RRLink, __assign({ to: to, className: classNames(classes.link, className) }, rest), children));
};
Link.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
export default Link;
