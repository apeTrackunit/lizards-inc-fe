import { rest } from 'msw';
import { ApiUrl, isLoggedIn } from '../MockUtils';

let animals = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'My Lizard',
    dateOfBirth: '2023-05-22T14:22:03.379Z',
    gender: 'M',
    color: '#ff9999',
    species: 'Zebrafish',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
    name: 'My Chameleon',
    dateOfBirth: '2023-05-22T14:22:03.379Z',
    gender: 'F',
    color: '#99b9ff',
    species: 'Not a fish',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
    name: 'My Tarantula',
    dateOfBirth: '2023-05-22T14:22:03.379Z',
    gender: 'O',
    color: '#6fc726',
    species: 'Neither a fish',
  },
];

const handlers = [
  rest.get(ApiUrl + '/Animals', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    return res(context.status(200), context.json(animals));
  }),

  rest.delete(ApiUrl + '/Animals/:id', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    if (req.url.pathname !== '') {
      const urlPath = req.url.pathname;
      const animalId = urlPath.substring(urlPath.lastIndexOf('/') + 1);

      animals = [...animals.filter(animal => animal.id !== animalId)];
    }

    return res(context.status(200));
  }),

  rest.post(ApiUrl + '/Animals', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    req.json().then(animal => {
      animal.id = Math.floor(Math.random() * 100000000) + '';
      animals.push(animal);
    });
    return res(context.status(200));
  }),
];

export default handlers;
