import { rest } from 'msw';
import { ApiUrl, isLoggedIn } from '../MockUtils';
import dayjs from 'dayjs';

const handlers = [
  rest.get(ApiUrl + '/Measurements/latest', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    return res(
      context.status(200),
      context.json({
        id: '1',
        temperature: 15,
        humidity: 64,
        co2: 20,
        dateTime: '2022-06-02T16:30:20',
      })
    );
  }),
  rest.get(ApiUrl + '/Measurements', (req, res, context) => {
    if (!isLoggedIn(req)) {
      return res(context.status(401));
    }

    // if we have url search parameter, then we generate some random data
    if (req.url.search !== '') {
      // search parameter is on, return random data
      const searchParams = new URLSearchParams(req.url.search);

      const milliSecondDifference =
        new Date(searchParams.get('dateTo')).getTime() - new Date(searchParams.get('dateFrom')).getTime();
      const dataToGenerate = milliSecondDifference / (1000 * 60 * 5);

      const randoms = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];

      const generateNextNumber = num => Math.cbrt(Math.sin(num / 10) * Math.cos(num / 10) * 6) + Math.random() * 5 - 2;

      const randomData = [...Array(dataToGenerate).keys()].map(i => ({
        id: '1',
        temperature: randoms[0] + generateNextNumber(i + randoms[0]),
        humidity: randoms[1] + generateNextNumber(i + randoms[0]),
        co2: randoms[2] + generateNextNumber(i + randoms[0]),
        dateTime: dayjs()
          .subtract((dataToGenerate - i) * 5, 'minute')
          .format('YYYY-MM-DD HH:mm:ss'),
      }));

      return res(context.status(200), context.json(randomData));
    }

    // else we return the hard-coded data
    return res(
      context.status(200),
      context.json([
        {
          id: '1',
          temperature: 12,
          humidity: 24,
          co2: 36,
          dateTime: '2022-06-02T16:30:20',
        },
        {
          id: '2',
          temperature: 16,
          humidity: 80,
          co2: 40,
          dateTime: '2022-06-03T16:30:20',
        },
        {
          id: '3',
          temperature: 13,
          humidity: 30,
          co2: 50,
          dateTime: '2022-06-04T16:30:20',
        },
        {
          id: '4',
          temperature: 18,
          humidity: 34,
          co2: 58,
          dateTime: '2022-06-04T20:30:20',
        },
        {
          id: '5',
          temperature: 20,
          humidity: 50,
          co2: 30,
          dateTime: '2022-06-05T16:30:20',
        },
        {
          id: '6',
          temperature: 15,
          humidity: 64,
          co2: 20,
          dateTime: '2022-06-06T16:30:20',
        },
      ])
    );
  }),
];

export default handlers;
