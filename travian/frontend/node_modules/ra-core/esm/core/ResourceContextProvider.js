import * as React from 'react';
import { ResourceContext } from './ResourceContext';
export var ResourceContextProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(ResourceContext.Provider, { value: value }, children));
};
