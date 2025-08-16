import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
