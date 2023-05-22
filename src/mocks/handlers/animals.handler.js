import { rest } from 'msw';
import { ApiUrl, isLoggedIn } from '../MockUtils';

let animals = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'My Lizard',
    dateOfBirth: '2023-05-22T14:22:03.379Z',
    gender: 'MALE',
    color: '#ff9999',
    species: 'Zebrafish',
  },
];

const handlers = [
  rest.get(ApiUrl + '/Animals', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    return res(context.status(200), context.json(animals));
  }),
];

export default handlers;
