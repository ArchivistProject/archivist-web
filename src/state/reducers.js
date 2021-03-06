import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import actionBar from './action-bar/action-bar-reducers';
import home from './home/home-reducers';
import item from './item/item-reducers';
import sidebar from './sidebar/sidebar-reducers';
import upload from './upload/upload-reducers';
import user from './user/user-reducers';
import settings from './settings/settings-reducers';
import viewer from './viewer/viewer-reducers';
import search from './search/search-reducers';

export default combineReducers({
    actionBar,
    home,
    item,
    sidebar,
    upload,
    user,
    settings,
    viewer,
    search,
    routing: routerReducer,
    notifications,
});
