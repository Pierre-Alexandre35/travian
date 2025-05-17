import { UPDATE_MANY } from '../../core';
export var crudUpdateMany = function (resource, ids, data, basePath, refresh) {
    if (refresh === void 0) { refresh = true; }
    return ({
        type: CRUD_UPDATE_MANY,
        payload: { ids: ids, data: data },
        meta: {
            resource: resource,
            fetch: UPDATE_MANY,
            onSuccess: {
                notification: {
                    body: 'ra.notification.updated',
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
export var CRUD_UPDATE_MANY = 'RA/CRUD_UPDATE_MANY';
export var CRUD_UPDATE_MANY_LOADING = 'RA/CRUD_UPDATE_MANY_LOADING';
export var CRUD_UPDATE_MANY_FAILURE = 'RA/CRUD_UPDATE_MANY_FAILURE';
export var CRUD_UPDATE_MANY_SUCCESS = 'RA/CRUD_UPDATE_MANY_SUCCESS';
