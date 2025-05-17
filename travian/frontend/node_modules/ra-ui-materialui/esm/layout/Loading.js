import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslate } from 'ra-core';
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        container: (_a = {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            },
            _a[theme.breakpoints.up('md')] = {
                height: '100%',
            },
            _a[theme.breakpoints.down('lg')] = {
                height: '100vh',
                marginTop: '-3em',
            },
            _a),
        icon: {
            width: '9em',
            height: '9em',
        },
        message: {
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            opacity: 0.5,
            margin: '0 1em',
        },
    });
}, { name: 'RaLoading' });
var Loading = function (props) {
    var className = props.className, _a = props.loadingPrimary, loadingPrimary = _a === void 0 ? 'ra.page.loading' : _a, _b = props.loadingSecondary, loadingSecondary = _b === void 0 ? 'ra.message.loading' : _b;
    var classes = useStyles(props);
    var translate = useTranslate();
    return (React.createElement("div", { className: classnames(classes.container, className) },
        React.createElement("div", { className: classes.message },
            React.createElement(CircularProgress, { className: classes.icon, color: "primary" }),
            React.createElement("h1", null, translate(loadingPrimary)),
            React.createElement("div", null,
                translate(loadingSecondary),
                "."))));
};
Loading.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    loadingPrimary: PropTypes.string,
    loadingSecondary: PropTypes.string,
};
Loading.defaultProps = {
    loadingPrimary: 'ra.page.loading',
    loadingSecondary: 'ra.message.loading',
};
export default Loading;
