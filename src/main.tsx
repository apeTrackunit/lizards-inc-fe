import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { SWRConfig } from 'swr';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { NotFoundPage, RoutingTable } from '@lizards-inc-fe/shared-components';
import { Home } from '@lizards-inc-fe/home';
import {LimitsAndBoundaries} from "@lizards-inc-fe/limits-and-boundaries";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RoutingTable.root} element={<App />}>
      <Route index element={<Home />} />

      <Route path={RoutingTable.home.root}>
        <Route index element={<Home />} />
      </Route>

      <Route path={RoutingTable.animals.root}>
        <Route index element={<h1>Animals</h1>} />
        <Route path={RoutingTable.animals.detail.edit} element={<h1>Edit animal</h1>} />
      </Route>

       <Route path={RoutingTable.limitsAndBoundaries.root}>
           <Route index element={<LimitsAndBoundaries/>} />
       </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

// Mock
if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser')
    worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  </StrictMode>
);
