import { LegacyDataProvider, DataProvider } from '../types';
interface ConvertedDataProvider extends DataProvider {
    (type: string, resource: string, params: any): Promise<any>;
}
/**
 * Turn a function-based dataProvider to an object-based one
 *
 * Allows using legacy dataProviders transparently.
 *
 * @param {Function} legacyDataProvider A legacy dataProvider (type, resource, params) => Promise<any>
 *
 * @returns {Object} A dataProvider that react-admin can use
 */
declare const convertLegacyDataProvider: (legacyDataProvider: LegacyDataProvider) => ConvertedDataProvider;
export default convertLegacyDataProvider;
//# sourceMappingURL=convertLegacyDataProvider.d.ts.map