// src/mocks/server.js
import { setupServer } from 'msw/node'
import Handlers from './handlers'

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...Handlers)

// setup: https://mswjs.io/docs/getting-started/integrate/node