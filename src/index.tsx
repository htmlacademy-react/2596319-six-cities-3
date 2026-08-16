import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { AuthorizationStatus } from './const/const';
import { store } from './store/store';
import { fetchOffersAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchOffersAction());


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App authorizationStatus={AuthorizationStatus.Auth}/>
    </Provider>

  </React.StrictMode>
);
