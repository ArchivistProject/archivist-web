import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import actionBar from './action-bar/action-bar-reducers';
import home from './home/home-reducers';
import item from './item/item-reducers';
import sidebar from './sidebar/sidebar-reducers';
import upload from './upload/upload-reducers';

export default combineReducers({
    actionBar,
    home,
    item,
    sidebar,
    upload,
    routing: routerReducer,
});
