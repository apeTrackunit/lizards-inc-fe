// src/mocks/browser.js
import { setupWorker } from 'msw'
import Handlers from './handlers'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...Handlers);

// importing this file from main.tsx