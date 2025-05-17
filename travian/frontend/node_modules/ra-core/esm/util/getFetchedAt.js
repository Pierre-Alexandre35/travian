var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import pickBy from 'lodash/pickBy';
var defaultCacheDuration = 10 * 60 * 1000; // ten minutes
/**
 * Returns a list of fetch dates by record id
 *
 * Given a list of new record ids and a previous list of fetch dates by record id,
 * add the new record ids at the current date,
 * and removes those among the old record ids that are stale.
 *
 * @param newRecordIds an array of record identifiers, e.g. [34, 56]
 * @param oldRecordFetchedAt the fetch dates of old records, e.g. { 12: new Date('12 minutes ago), 34: new Date('5 minutes ago') }
 * @param now Current time (useful for tests)
 * @param cacheDuration How long until an old record is removed from the list
 */
var getFetchedAt = function (newRecordIds, oldRecordFetchedAt, now, cacheDuration) {
    if (newRecordIds === void 0) { newRecordIds = []; }
    if (oldRecordFetchedAt === void 0) { oldRecordFetchedAt = {}; }
    if (now === void 0) { now = new Date(); }
    if (cacheDuration === void 0) { cacheDuration = defaultCacheDuration; }
    // prepare new records and timestamp them
    var newFetchedAt = {};
    newRecordIds.forEach(function (recordId) { return (newFetchedAt[recordId] = now); });
    // remove outdated entry
    var latestValidDate = new Date();
    latestValidDate.setTime(latestValidDate.getTime() - cacheDuration);
    var stillValidFetchedAt = pickBy(oldRecordFetchedAt, function (date) { return date > latestValidDate; });
    return __assign(__assign({}, stillValidFetchedAt), newFetchedAt);
};
export default getFetchedAt;
