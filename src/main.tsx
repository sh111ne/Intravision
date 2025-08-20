import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary
        fallback={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Произошла критическая ошибка 😕</h2>
            <p>Попробуйте перезагрузить страницу</p>
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: '10px', padding: '8px 16px' }}>
              Перезагрузить страницу
            </button>
          </div>
        }
        onError={(error, errorInfo) => {
          console.error('Global error caught:', error, errorInfo);
        }}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
);
