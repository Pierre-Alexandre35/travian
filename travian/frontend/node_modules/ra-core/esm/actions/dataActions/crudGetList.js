import { GET_LIST } from '../../core';
export var crudGetList = function (resource, pagination, sort, filter) { return ({
    type: CRUD_GET_LIST,
    payload: { pagination: pagination, sort: sort, filter: filter },
    meta: {
        resource: resource,
        fetch: GET_LIST,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
export var CRUD_GET_LIST = 'RA/CRUD_GET_LIST';
export var CRUD_GET_LIST_LOADING = 'RA/CRUD_GET_LIST_LOADING';
export var CRUD_GET_LIST_FAILURE = 'RA/CRUD_GET_LIST_FAILURE';
export var CRUD_GET_LIST_SUCCESS = 'RA/CRUD_GET_LIST_SUCCESS';
