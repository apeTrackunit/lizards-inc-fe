import MeasurementHandlers from './handlers/measurement.handler';
import BoundariesHandler from './handlers/boundaries.handler';
import AuthenticationHandler from './handlers/authentication.handler';

const handlers = [...MeasurementHandlers, ...BoundariesHandler, ...AuthenticationHandler];

export default handlers;
