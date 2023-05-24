import { rest } from 'msw';
import { ApiUrl, isLoggedIn } from '../MockUtils';

let serverBoundaries = {
  id: '3fa95f64-5717-4562-b3fc-2c963f56aff1',
  temperatureBoundaryMax: 20,
  temperatureBoundaryMin: 10,
  humidityBoundaryMax: 20,
  humidityBoundaryMin: 5,
  cO2BoundaryMax: 40,
  cO2BoundaryMin: 6,
};

const handlers = [
  rest.get(ApiUrl + '/Terrarium/boundaries', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    return res(context.status(200), context.json(serverBoundaries));
  }),
  rest.put(ApiUrl + '/Terrarium/boundaries', async (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    serverBoundaries = await req.json();
    return res(context.status(200), context.json(serverBoundaries));
  }),
];

export default handlers;
