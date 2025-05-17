import jsonExport from 'jsonexport/dist';
import downloadCSV from './downloadCSV';
var defaultExporter = function (data, _, __, resource) {
    return jsonExport(data, function (err, csv) { return downloadCSV(csv, resource); });
};
export default defaultExporter;
