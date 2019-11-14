import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './App';
import rootReducer from './reducers/rootReducer';
import {customApiMiddleware} from './middleware/apiMiddleware';
import {fetchTokensFromLocalStorage} from './actions/authActions';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            customApiMiddleware(),
            thunk,
        )
    )
);

store.dispatch(fetchTokensFromLocalStorage());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);