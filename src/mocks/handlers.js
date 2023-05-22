import MeasurementHandlers from './handlers/measurement.handler';
import BoundariesHandler from './handlers/boundaries.handler';
import AuthenticationHandler from './handlers/authentication.handler';
import LimitsHandler from './handlers/limits.handler';
import NotificationsHandler from './handlers/notifications.handler';
import TerrariumHandler from './handlers/terrarium.handler';
import AnimalsHandler from './handlers/animals.handler';

const handlers = [
  ...MeasurementHandlers,
  ...BoundariesHandler,
  ...AuthenticationHandler,
  ...LimitsHandler,
  ...NotificationsHandler,
  ...TerrariumHandler,
  ...AnimalsHandler,
];

export default handlers;
