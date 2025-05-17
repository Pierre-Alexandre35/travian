export var CRUD_CHANGE_LIST_PARAMS = 'RA/CRUD_CHANGE_LIST_PARAMS';
export var changeListParams = function (resource, params) { return ({
    type: CRUD_CHANGE_LIST_PARAMS,
    payload: params,
    meta: { resource: resource },
}); };
export var SET_LIST_SELECTED_IDS = 'RA/SET_LIST_SELECTED_IDS';
export var setListSelectedIds = function (resource, ids) { return ({
    type: SET_LIST_SELECTED_IDS,
    payload: ids,
    meta: { resource: resource },
}); };
export var TOGGLE_LIST_ITEM = 'RA/TOGGLE_LIST_ITEM';
export var toggleListItem = function (resource, id) { return ({
    type: TOGGLE_LIST_ITEM,
    payload: id,
    meta: { resource: resource },
}); };
export var TOGGLE_LIST_ITEM_EXPAND = 'RA/TOGGLE_LIST_ITEM_EXPAND';
/**
 * Action creator to toggle the expanded state of a list item
 *
 * @param {string} resource The resource name, e.g. 'posts'
 * @param {string|integer} id The record identifier, e.g. 123
 *
 * @example
 *
 * const onToggleItem = () => dispatch(toggleListItemExpand('posts', 123));
 */
export var toggleListItemExpand = function (resource, id) { return ({
    type: TOGGLE_LIST_ITEM_EXPAND,
    payload: id,
    meta: { resource: resource },
}); };
