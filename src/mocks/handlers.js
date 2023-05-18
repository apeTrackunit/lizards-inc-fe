import MeasurementHandlers from './handlers/measurement.handler';
import BoundariesHandler from './handlers/boundaries.handler';

const handlers = [...MeasurementHandlers, ...BoundariesHandler];

export default handlers;
