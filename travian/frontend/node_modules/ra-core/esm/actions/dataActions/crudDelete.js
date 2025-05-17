import { DELETE } from '../../core';
export var crudDelete = function (resource, id, previousData, basePath, redirectTo, refresh) {
    if (redirectTo === void 0) { redirectTo = 'list'; }
    if (refresh === void 0) { refresh = true; }
    return ({
        type: CRUD_DELETE,
        payload: { id: id, previousData: previousData },
        meta: {
            resource: resource,
            fetch: DELETE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.deleted',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                    },
                },
                refresh: refresh,
                redirectTo: redirectTo,
                basePath: basePath,
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
export var CRUD_DELETE = 'RA/CRUD_DELETE';
export var CRUD_DELETE_LOADING = 'RA/CRUD_DELETE_LOADING';
export var CRUD_DELETE_FAILURE = 'RA/CRUD_DELETE_FAILURE';
export var CRUD_DELETE_SUCCESS = 'RA/CRUD_DELETE_SUCCESS';
