import * as React from 'react';
import PropTypes from 'prop-types';
import Title, { TitlePropType } from './Title';
var TitleForRecord = function (_a) {
    var defaultTitle = _a.defaultTitle, record = _a.record, title = _a.title;
    return record ? (React.createElement(Title, { title: title, record: record, defaultTitle: defaultTitle })) : null;
};
TitleForRecord.propTypes = {
    defaultTitle: PropTypes.any,
    record: PropTypes.object,
    title: TitlePropType,
};
export default TitleForRecord;
