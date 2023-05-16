import { rest } from 'msw';
import { ApiUrl } from '../ApiUrl';

const handlers = [
  rest.get(ApiUrl + '/Terrarium/boundaries', (req, res, context) => {
    return res(
      context.status(200),
      context.json({
        id: '3fa95f64-5717-4562-b3fc-2c963f56aff1',
        temperatureBoundaryMax: 20,
        temperatureBoundaryMin: 10,
        humidityBoundaryMax: 20,
        humidityBoundaryMin: 5,
        cO2BoundaryMax: 40,
        cO2BoundaryMin: 25,
      })
    );
  }),
];

export default handlers;
