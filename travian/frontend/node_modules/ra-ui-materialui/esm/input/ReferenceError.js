import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
var ReferenceError = function (_a) {
    var label = _a.label, error = _a.error;
    return (React.createElement(TextField, { error: true, disabled: true, label: label, value: error, margin: "normal" }));
};
ReferenceError.propTypes = {
    error: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};
export default ReferenceError;
