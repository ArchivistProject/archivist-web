import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../state/reducers';
import NotificationMiddleware from './notification-middleware';
import RedirectMiddleware from './redirect-middleware';

const logger = createLogger();
const router = routerMiddleware(browserHistory);

const createStoreWithMiddleware = compose(applyMiddleware(thunk, router, logger, NotificationMiddleware, RedirectMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
