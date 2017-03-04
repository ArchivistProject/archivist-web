import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import { App, Home, Login, Upload, Settings, Viewer } from './views';
import './assets/style/style.scss';


const store = configureStore();
window.store = store;

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRedirect to='items' />
                <Route path='items'>
                    <IndexRoute component={Home} />
                    <Route path=':itemId' component={Viewer} />
                </Route>
                <Route path='login' component={Login} />
                <Route path='settings' component={Settings} />
                <Route path='upload' component={Upload} />
                <Redirect from='*' to='items' />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
