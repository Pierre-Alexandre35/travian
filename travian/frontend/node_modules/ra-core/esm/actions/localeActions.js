export var CHANGE_LOCALE = 'RA/CHANGE_LOCALE';
export var changeLocale = function (locale) { return ({
    type: CHANGE_LOCALE,
    payload: locale,
}); };
export var CHANGE_LOCALE_SUCCESS = 'RA/CHANGE_LOCALE_SUCCESS';
export var changeLocaleSuccess = function (locale, messages) { return ({
    type: CHANGE_LOCALE_SUCCESS,
    payload: {
        locale: locale,
        messages: messages,
    },
}); };
export var CHANGE_LOCALE_FAILURE = 'RA/CHANGE_LOCALE_FAILURE';
export var changeLocaleFailure = function (locale, error) { return ({
    type: CHANGE_LOCALE_FAILURE,
    error: error,
    payload: {
        locale: locale,
    },
}); };
