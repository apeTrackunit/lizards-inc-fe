import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { SWRConfig } from 'swr';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ErrorCodePage, ErrorParamsPage, RoutingTable } from '@lizards-inc-fe/shared-components';
import { Home } from '@lizards-inc-fe/home';
import { MeasurementHistory } from '@lizards-inc-fe/measurement-history';
import { RequireAuth } from '@lizards-inc-fe/login';
import { AuthProvider } from '@lizards-inc-fe/auth';
import { LimitsAndBoundaries } from '@lizards-inc-fe/limits-and-boundaries';
import { Terrarium } from '@lizards-inc-fe/terrarium';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={RoutingTable.root}
      element={
        <RequireAuth>
          <App />
        </RequireAuth>
      }
    >
      <Route index element={<Home />} />

      <Route path={RoutingTable.home.root}>
        <Route index element={<Home />} />
      </Route>

      <Route path={RoutingTable.terrarium.root}>
        <Route index element={<Terrarium />} />
      </Route>

      <Route path={RoutingTable.history.root}>
        <Route index element={<MeasurementHistory />} />
      </Route>

      <Route path={RoutingTable.limitsAndBoundaries.root}>
        <Route index element={<LimitsAndBoundaries />} />
      </Route>

      <Route path="/error/:code" element={<ErrorParamsPage />} />
      <Route path="*" element={<ErrorCodePage errorCode={404} />} />
    </Route>
  )
);

// Mock
if (process.env.NODE_ENV == 'development' && process.env.NX_MOCK_WORKER === '1') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require('./mocks/browser');
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <AuthProvider>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          refreshInterval: 1000 * 60 * 5,
        }}
      >
        <RouterProvider router={router} />
      </SWRConfig>
    </AuthProvider>
  </StrictMode>
);
