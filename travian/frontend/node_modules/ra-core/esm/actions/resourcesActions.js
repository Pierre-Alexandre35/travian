export var REGISTER_RESOURCE = 'RA/REGISTER_RESOURCE';
export var registerResource = function (resource) { return ({
    type: REGISTER_RESOURCE,
    payload: resource,
}); };
export var UNREGISTER_RESOURCE = 'RA/UNREGISTER_RESOURCE';
export var unregisterResource = function (resourceName) { return ({
    type: UNREGISTER_RESOURCE,
    payload: resourceName,
}); };
