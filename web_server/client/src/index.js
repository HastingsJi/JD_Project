import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './App/App';
import reducers from './reducers/index';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDom.render(
    <Provider store={ createStoreWithMiddleware(reducers) }>
        <App />
    </Provider>,
    
    document.getElementById('root')
);