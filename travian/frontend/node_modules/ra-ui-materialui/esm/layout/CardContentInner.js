import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        root: {
            paddingTop: 0,
            paddingBottom: 0,
            '&:first-child': {
                paddingTop: 16,
            },
            '&:last-child': (_a = {
                    paddingBottom: 16
                },
                _a[theme.breakpoints.only('xs')] = {
                    paddingBottom: 70,
                },
                _a),
        },
    });
}, { name: 'RaCardContentInner' });
/**
 * Overrides material-ui CardContent to allow inner content
 *
 * When using several CardContent inside the same Card, the top and bottom
 * padding double the spacing between each CardContent, leading to too much
 * wasted space. Use this component as a CardContent alternative.
 */
var CardContentInner = function (props) {
    var className = props.className, children = props.children;
    var classes = useStyles(props);
    return (React.createElement(CardContent, { className: classnames(classes.root, className) }, children));
};
CardContentInner.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    children: PropTypes.node,
};
export default CardContentInner;
