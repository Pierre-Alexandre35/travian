import { GET_LIST } from '../../core';
export var crudGetAll = function (resource, sort, filter, maxResults, callback) { return ({
    type: CRUD_GET_ALL,
    payload: { sort: sort, filter: filter, pagination: { page: 1, perPage: maxResults } },
    meta: {
        resource: resource,
        fetch: GET_LIST,
        onSuccess: {
            callback: callback,
        },
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
export var CRUD_GET_ALL = 'RA/CRUD_GET_ALL';
export var CRUD_GET_ALL_LOADING = 'RA/CRUD_GET_ALL_LOADING';
export var CRUD_GET_ALL_FAILURE = 'RA/CRUD_GET_ALL_FAILURE';
export var CRUD_GET_ALL_SUCCESS = 'RA/CRUD_GET_ALL_SUCCESS';
