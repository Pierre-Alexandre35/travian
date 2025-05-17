import { GET_ONE } from '../../core';
export var crudGetOne = function (resource, id, basePath, refresh) {
    if (refresh === void 0) { refresh = true; }
    return ({
        type: CRUD_GET_ONE,
        payload: { id: id },
        meta: {
            resource: resource,
            fetch: GET_ONE,
            basePath: basePath,
            onFailure: {
                notification: {
                    body: 'ra.notification.item_doesnt_exist',
                    level: 'warning',
                },
                redirectTo: 'list',
                refresh: refresh,
            },
        },
    });
};
export var CRUD_GET_ONE = 'RA/CRUD_GET_ONE';
export var CRUD_GET_ONE_LOADING = 'RA/CRUD_GET_ONE_LOADING';
export var CRUD_GET_ONE_FAILURE = 'RA/CRUD_GET_ONE_FAILURE';
export var CRUD_GET_ONE_SUCCESS = 'RA/CRUD_GET_ONE_SUCCESS';
