import { rest } from 'msw';
import { ApiUrl, isLoggedIn } from '../MockUtils';

let notifications = [
  {
    id: '928d5614-46a9-4db6-86e9-e10a431730f8',
    dateTime: '2023-05-16T10:46:40.771832Z',
    message:
      'Humidity level is outside of the boundary. The current value is: 60.8, which is 39.2 lower than the boundary that is: 100.',
    status: false,
  },
  {
    id: 'dc5ffaa5-10e3-4521-a00c-8f829da404ed',
    dateTime: '2023-05-16T10:46:40.822903Z',
    message:
      'Temperature level is outside of the boundary. The current value is: 25.9, which is 74.1 lower than the boundary that is: 100.',
    status: false,
  },
];

const handlers = [
  rest.get(ApiUrl + '/Notifications', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    return res(context.status(200), context.json(notifications));
  }),
  rest.put(ApiUrl + '/Notifications', async (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    const notificationsToChange = await req.json();
    notificationsToChange.ids.forEach(id => {
      const notification = notifications.reduce((notification, cur) => (cur.id === id ? cur : notification), undefined);
      if (notification) notification.status = true;
    });

    return res(context.status(200));
  }),
];

export default handlers;
