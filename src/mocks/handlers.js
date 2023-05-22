import MeasurementHandlers from './handlers/measurement.handler';
import BoundariesHandler from './handlers/boundaries.handler';
import AuthenticationHandler from './handlers/authentication.handler';
import LimitsHandler from './handlers/limits.handler';
import NotificationsHandler from './handlers/notifications.handler';

const handlers = [
  ...MeasurementHandlers,
  ...BoundariesHandler,
  ...AuthenticationHandler,
  ...LimitsHandler,
  ...NotificationsHandler,
];

export default handlers;
