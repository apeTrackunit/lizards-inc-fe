import { rest } from 'msw';
import { ApiUrl } from '../ApiUrl';

const handlers = [
  rest.get(ApiUrl + '/Measurements/latest', (req, res, context) => {
    return res(
      context.status(200),
      context.json({
        id: '1',
        temperature: 15,
        humidity: 64,
        co2: 20,
        date: '2022-06-02',
        time: '16:30:20',
      })
    );
  }),
  rest.get(ApiUrl + '/Measurements', (req, res, context) => {
    return res(
      context.status(200),
      context.json([
        {
          id: '1',
          temperature: 12,
          humidity: 24,
          co2: 36,
          date: '2022-06-02',
          time: '16:30:20',
        },
        {
          id: '2',
          temperature: 16,
          humidity: 80,
          co2: 40,
          date: '2022-06-03',
          time: '16:30:20',
        },
        {
          id: '3',
          temperature: 13,
          humidity: 30,
          co2: 50,
          date: '2022-06-04',
          time: '16:30:20',
        },
        {
          id: '4',
          temperature: 20,
          humidity: 50,
          co2: 30,
          date: '2022-06-05',
          time: '16:30:20',
        },
        {
          id: '5',
          temperature: 15,
          humidity: 64,
          co2: 20,
          date: '2022-06-06',
          time: '16:30:20',
        },
      ])
    );
  }),
];

export default handlers;
