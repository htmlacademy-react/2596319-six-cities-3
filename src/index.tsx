import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import { offers } from './mocks/offers';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App authorizationStatus={AuthorizationStatus.Auth} offers={offers}/>
    </Provider>

  </React.StrictMode>
);
