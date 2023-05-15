import { rest } from 'msw'
import {ApiUrl} from "../ApiUrl";

const handlers = [
    rest.get(ApiUrl + '/Measurements/latest', (req, res, context) => {
        return res(
            context.status(200),
            context.json({
                id: '1',
                temperature: 12,
                humidity: 24,
                co2: 36,
                date: '2022-06-02',
                time: '16:30:20'
            })
        )
    })
]

export default handlers;