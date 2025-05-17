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
import withWidth from '@material-ui/core/withWidth';
/**
 * @deprecated use useMediaQuery instead
 */
export var Responsive = function (_a) {
    var xsmall = _a.xsmall, small = _a.small, medium = _a.medium, large = _a.large, width = _a.width, rest = __rest(_a, ["xsmall", "small", "medium", "large", "width"]);
    var element;
    switch (width) {
        case 'xs':
            element =
                typeof xsmall !== 'undefined'
                    ? xsmall
                    : typeof small !== 'undefined'
                        ? small
                        : typeof medium !== 'undefined'
                            ? medium
                            : large;
            break;
        case 'sm':
            element =
                typeof small !== 'undefined'
                    ? small
                    : typeof medium !== 'undefined'
                        ? medium
                        : large;
            break;
        case 'md':
            element =
                typeof medium !== 'undefined'
                    ? medium
                    : typeof large !== 'undefined'
                        ? large
                        : small;
            break;
        case 'lg':
        case 'xl':
            element =
                typeof large !== 'undefined'
                    ? large
                    : typeof medium !== 'undefined'
                        ? medium
                        : small;
            break;
        default:
            throw new Error("Unknown width " + width);
    }
    return element ? React.cloneElement(element, rest) : null;
};
Responsive.propTypes = {
    xsmall: PropTypes.element,
    small: PropTypes.element,
    medium: PropTypes.element,
    large: PropTypes.element,
    width: PropTypes.string,
};
export default withWidth({ initialWidth: 'xs' })(Responsive);
