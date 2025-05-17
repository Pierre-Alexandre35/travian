import { CREATE, DELETE, DELETE_MANY, GET_LIST, GET_MANY, GET_MANY_REFERENCE, GET_ONE, UPDATE, UPDATE_MANY, } from '../core';
var defaultDataProvider = function () { return Promise.resolve(); };
defaultDataProvider.create = function () { return Promise.resolve(null); };
defaultDataProvider.delete = function () { return Promise.resolve(null); };
defaultDataProvider.deleteMany = function () { return Promise.resolve(null); };
defaultDataProvider.getList = function () { return Promise.resolve(null); };
defaultDataProvider.getMany = function () { return Promise.resolve(null); };
defaultDataProvider.getManyReference = function () { return Promise.resolve(null); };
defaultDataProvider.getOne = function () { return Promise.resolve(null); };
defaultDataProvider.update = function () { return Promise.resolve(null); };
defaultDataProvider.updateMany = function () { return Promise.resolve(null); };
var fetchMap = {
    create: CREATE,
    delete: DELETE,
    deleteMany: DELETE_MANY,
    getList: GET_LIST,
    getMany: GET_MANY,
    getManyReference: GET_MANY_REFERENCE,
    getOne: GET_ONE,
    update: UPDATE,
    updateMany: UPDATE_MANY,
};
/**
 * Turn a function-based dataProvider to an object-based one
 *
 * Allows using legacy dataProviders transparently.
 *
 * @param {Function} legacyDataProvider A legacy dataProvider (type, resource, params) => Promise<any>
 *
 * @returns {Object} A dataProvider that react-admin can use
 */
var convertLegacyDataProvider = function (legacyDataProvider) {
    var proxy = new Proxy(defaultDataProvider, {
        get: function (_, name) {
            return function (resource, params) {
                if (Object.keys(fetchMap).includes(name.toString())) {
                    var fetchType = fetchMap[name.toString()];
                    return legacyDataProvider(fetchType, resource, params);
                }
                return legacyDataProvider(name.toString(), resource, params);
            };
        },
        apply: function (_, __, args) {
            return legacyDataProvider.apply(legacyDataProvider, args);
        },
    });
    return proxy;
};
export default convertLegacyDataProvider;
