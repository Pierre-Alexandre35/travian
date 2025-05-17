import { CREATE } from '../../core';
export var crudCreate = function (resource, data, basePath, redirectTo) {
    if (redirectTo === void 0) { redirectTo = 'edit'; }
    return ({
        type: CRUD_CREATE,
        payload: { data: data },
        meta: {
            resource: resource,
            fetch: CREATE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.created',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                    },
                },
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
export var CRUD_CREATE = 'RA/CRUD_CREATE';
export var CRUD_CREATE_LOADING = 'RA/CRUD_CREATE_LOADING';
export var CRUD_CREATE_FAILURE = 'RA/CRUD_CREATE_FAILURE';
export var CRUD_CREATE_SUCCESS = 'RA/CRUD_CREATE_SUCCESS';
