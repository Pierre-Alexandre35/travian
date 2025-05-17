import { DELETE_MANY } from '../../core';
export var crudDeleteMany = function (resource, ids, basePath, refresh) {
    if (refresh === void 0) { refresh = true; }
    return ({
        type: CRUD_DELETE_MANY,
        payload: { ids: ids },
        meta: {
            resource: resource,
            fetch: DELETE_MANY,
            onSuccess: {
                notification: {
                    body: 'ra.notification.deleted',
                    level: 'info',
                    messageArgs: {
                        smart_count: ids.length,
                    },
                },
                basePath: basePath,
                refresh: refresh,
                unselectAll: true,
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
export var CRUD_DELETE_MANY = 'RA/CRUD_DELETE_MANY';
export var CRUD_DELETE_MANY_LOADING = 'RA/CRUD_DELETE_MANY_LOADING';
export var CRUD_DELETE_MANY_FAILURE = 'RA/CRUD_DELETE_MANY_FAILURE';
export var CRUD_DELETE_MANY_SUCCESS = 'RA/CRUD_DELETE_MANY_SUCCESS';
