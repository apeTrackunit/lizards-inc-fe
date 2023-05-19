import MeasurementHandlers from './handlers/measurement.handler';
import BoundariesHandler from './handlers/boundaries.handler';
import AuthenticationHandler from './handlers/authentication.handler';
import LimitsHandler from './handlers/limits.handler';

const handlers = [...MeasurementHandlers, ...BoundariesHandler, ...AuthenticationHandler, ...LimitsHandler];

export default handlers;
