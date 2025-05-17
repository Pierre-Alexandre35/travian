export var CRUD_SHOW_FILTER = 'RA/CRUD_SHOW_FILTER';
export var showFilter = function (resource, field) { return ({
    type: CRUD_SHOW_FILTER,
    payload: { field: field },
    meta: { resource: resource },
}); };
export var CRUD_HIDE_FILTER = 'RA/CRUD_HIDE_FILTER';
export var hideFilter = function (resource, field) { return ({
    type: CRUD_HIDE_FILTER,
    payload: { field: field },
    meta: { resource: resource },
}); };
export var CRUD_SET_FILTER = 'RA/CRUD_SET_FILTER';
export var setFilter = function (resource, field, value) { return ({
    type: CRUD_SET_FILTER,
    payload: { field: field, value: value },
    meta: { resource: resource },
}); };
