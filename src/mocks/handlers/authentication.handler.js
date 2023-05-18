import { rest } from 'msw';
import { ApiUrl } from '../ApiUrl';

const handlers = [
  rest.post(ApiUrl + '/Authentication', (req, res, context) => {
    return res(
      context.status(200),
      context.json({
        access_token: 'fake-access-token',
        expires_in: 1000000,
        id_token: 'fake-token',
        refresh_token: 'fake-refresh',
        scope: 'fake-scope',
        token_type: 'fake-type',
      })
    );
  }),
];

export default handlers;
