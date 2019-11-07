import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {apiMiddleware} from 'redux-api-middleware';


import App from './App';
// import api from './middleware/api';
import rootReducer from './reducers/rootReducer';
import {fetchTokensFromLocalStorage} from './actions/authActions';

const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        apiMiddleware),
));

store.dispatch(fetchTokensFromLocalStorage());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);