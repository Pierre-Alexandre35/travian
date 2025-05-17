import { createContext } from 'react';
import defaultExporter from './defaultExporter';
var ExporterContext = createContext(defaultExporter);
ExporterContext.displayName = 'ExporterContext';
export default ExporterContext;
