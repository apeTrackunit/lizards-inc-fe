import { rest } from 'msw';
import { ApiUrl, isLoggedIn } from '../MockUtils';

let serverLimits = {
  id: '3fa95f64-5717-4562-b3fc-2c963f56aff1',
  temperatureLimitMax: 43.9,
  temperatureLimitMin: 0,
};

const handlers = [
  rest.get(ApiUrl + '/Terrarium/limits', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    return res(context.status(200), context.json(serverLimits));
  }),
  rest.put(ApiUrl + '/Terrarium/limits', async (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    serverLimits = await req.json();
    return res(context.status(200), context.json(serverLimits));
  }),
];

export default handlers;
