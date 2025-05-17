var fiveMinutes = 5 * 60 * 1000;
/**
 * Wrap a dataProvider in a Proxy that modifies responses to add caching.
 *
 * This proxy adds a validUntil field to the response of read queries
 * (getList, getMany, getOne) so that the useDataProvider enables caching
 * for these calls.
 *
 * @param {DataProvider} dataProvider A data provider object
 * @param {number} duration Cache duration in milliseconds. Defaults to 5 minutes.
 *
 * @example
 *
 * import { cacheDataProviderProxy } from 'ra-core';
 *
 * const cacheEnabledDataProvider = cacheDataProviderProxy(dataProvider);
 */
export default (function (dataProvider, duration) {
    if (duration === void 0) { duration = fiveMinutes; }
    return new Proxy(dataProvider, {
        get: function (target, name) {
            if (typeof name === 'symbol') {
                return;
            }
            return function (resource, params) {
                if (name === 'getList' ||
                    name === 'getMany' ||
                    name === 'getOne') {
                    // @ts-ignore
                    return dataProvider[name](resource, params).then(function (response) {
                        var validUntil = new Date();
                        validUntil.setTime(validUntil.getTime() + duration);
                        response.validUntil = validUntil;
                        return response;
                    });
                }
                return dataProvider[name](resource, params);
            };
        },
    });
});
