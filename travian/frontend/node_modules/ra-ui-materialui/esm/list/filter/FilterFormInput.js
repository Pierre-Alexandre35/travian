import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ActionHide from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useResourceContext, useTranslate } from 'ra-core';
var emptyRecord = {};
var useStyles = makeStyles(function (theme) { return ({
    body: {
        display: 'flex',
        alignItems: 'flex-end',
        pointerEvents: 'auto',
    },
    spacer: { width: theme.spacing(2) },
    hideButton: {},
}); }, { name: 'RaFilterFormInput' });
var FilterFormInput = function (props) {
    var filterElement = props.filterElement, handleHide = props.handleHide, variant = props.variant, margin = props.margin;
    var resource = useResourceContext(props);
    var translate = useTranslate();
    var classes = useStyles(props);
    return (React.createElement("div", { "data-source": filterElement.props.source, className: classnames('filter-field', classes.body) },
        !filterElement.props.alwaysOn && (React.createElement(IconButton, { className: classnames('hide-filter', classes.hideButton), onClick: handleHide, "data-key": filterElement.props.source, title: translate('ra.action.remove_filter') },
            React.createElement(ActionHide, null))),
        React.cloneElement(filterElement, {
            allowEmpty: filterElement.props.allowEmpty === undefined
                ? true
                : filterElement.props.allowEmpty,
            resource: resource,
            record: emptyRecord,
            variant: variant,
            margin: margin,
            helperText: false,
            // ignore defaultValue in Field because it was already set in Form (via mergedInitialValuesWithDefaultValues)
            defaultValue: undefined,
        }),
        React.createElement("div", { className: classes.spacer }, "\u00A0")));
};
FilterFormInput.propTypes = {
    filterElement: PropTypes.node,
    handleHide: PropTypes.func,
    classes: PropTypes.object,
    resource: PropTypes.string,
    margin: PropTypes.string,
    variant: PropTypes.string,
};
export default FilterFormInput;
