import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './home/home-reducers';
import actionBar from './action-bar/action-bar-reducers';
import sidebar from './sidebar/sidebar-reducers';
import upload from './upload/upload-reducers';

export default combineReducers({
    home,
    actionBar,
    sidebar,
    upload,
    routing: routerReducer,
});
