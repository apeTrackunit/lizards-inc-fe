import { rest } from 'msw';
import { ApiUrl, isLoggedIn } from '../MockUtils';

let terrarium = {
  name: "David Beckham's Terrarium",
};

const handlers = [
  rest.get(ApiUrl + '/Terrarium', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    return res(context.status(200), context.json(terrarium));
  }),
];

export default handlers;
