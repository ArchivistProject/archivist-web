import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import { App, Home, Login, Upload } from './views';
import './style.scss';

const store = configureStore();
window.store = store;

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
                <Route path='login' component={Login} />
                <Route path='upload' component={Upload} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
