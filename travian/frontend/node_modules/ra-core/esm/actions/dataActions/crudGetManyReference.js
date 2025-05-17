import { GET_MANY_REFERENCE } from '../../core';
export var crudGetManyReference = function (reference, target, id, relatedTo, pagination, sort, filter, source) { return ({
    type: CRUD_GET_MANY_REFERENCE,
    payload: { target: target, id: id, pagination: pagination, sort: sort, filter: filter, source: source },
    meta: {
        resource: reference,
        relatedTo: relatedTo,
        fetch: GET_MANY_REFERENCE,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
export var CRUD_GET_MANY_REFERENCE = 'RA/CRUD_GET_MANY_REFERENCE';
export var CRUD_GET_MANY_REFERENCE_LOADING = 'RA/CRUD_GET_MANY_REFERENCE_LOADING';
export var CRUD_GET_MANY_REFERENCE_FAILURE = 'RA/CRUD_GET_MANY_REFERENCE_FAILURE';
export var CRUD_GET_MANY_REFERENCE_SUCCESS = 'RA/CRUD_GET_MANY_REFERENCE_SUCCESS';
