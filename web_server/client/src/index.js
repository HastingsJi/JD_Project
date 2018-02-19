import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './App/App';
import DatePicker from './DatePicker/DatePicker'
import reducers from './reducers/index';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDom.render(
    <Provider store={ createStoreWithMiddleware(reducers) }>
        {/* <DatePicker /> */}
        <App />
    </Provider>,
    
    document.getElementById('root')
);