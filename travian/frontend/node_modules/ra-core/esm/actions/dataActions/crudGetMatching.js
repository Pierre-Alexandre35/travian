import { GET_LIST } from '../../core';
export var crudGetMatching = function (reference, relatedTo, pagination, sort, filter) { return ({
    type: CRUD_GET_MATCHING,
    payload: { pagination: pagination, sort: sort, filter: filter },
    meta: {
        resource: reference,
        relatedTo: relatedTo,
        fetch: GET_LIST,
        onFailure: {
            notification: {
                body: 'ra.notification.http_error',
                level: 'warning',
            },
        },
    },
}); };
export var CRUD_GET_MATCHING = 'RA/CRUD_GET_MATCHING';
export var CRUD_GET_MATCHING_LOADING = 'RA/CRUD_GET_MATCHING_LOADING';
export var CRUD_GET_MATCHING_FAILURE = 'RA/CRUD_GET_MATCHING_FAILURE';
export var CRUD_GET_MATCHING_SUCCESS = 'RA/CRUD_GET_MATCHING_SUCCESS';
