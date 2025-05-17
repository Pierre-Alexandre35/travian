import { GET_MANY } from '../../core';
export var crudGetMany = function (resource, ids) { return ({
    type: CRUD_GET_MANY,
    payload: { ids: ids },
    meta: {
        resource: resource,
        fetch: GET_MANY,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
export var CRUD_GET_MANY = 'RA/CRUD_GET_MANY';
export var CRUD_GET_MANY_LOADING = 'RA/CRUD_GET_MANY_LOADING';
export var CRUD_GET_MANY_FAILURE = 'RA/CRUD_GET_MANY_FAILURE';
export var CRUD_GET_MANY_SUCCESS = 'RA/CRUD_GET_MANY_SUCCESS';
