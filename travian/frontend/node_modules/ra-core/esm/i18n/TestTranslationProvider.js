import * as React from 'react';
import lodashGet from 'lodash/get';
import { TranslationContext } from './TranslationContext';
export default (function (_a) {
    var translate = _a.translate, messages = _a.messages, children = _a.children;
    return (React.createElement(TranslationContext.Provider, { value: {
            locale: 'en',
            setLocale: function () { return Promise.resolve(); },
            i18nProvider: {
                translate: messages
                    ? function (key, options) {
                        return lodashGet(messages, key)
                            ? lodashGet(messages, key)
                            : options._;
                    }
                    : translate,
                changeLocale: function () { return Promise.resolve(); },
                getLocale: function () { return 'en'; },
            },
        } }, children));
});
