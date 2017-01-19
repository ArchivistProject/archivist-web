import sidebarActionTypes from './sidebar-action-types';
import { SIDEBAR_TABS } from './sidebar-constants';

const initialState = {
    visible: false,
    visibleTab: SIDEBAR_TABS.SUMMARY,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case sidebarActionTypes.VISIBILITY_UPDATED: {
            const { visible } = action.data;
            return {
                ...state,
                visible,
            };
        }
        case sidebarActionTypes.VISIBLE_TAB_UPDATED: {
            const { tabName } = action.data;
            return {
                ...state,
                visibleTab: tabName,
            };
        }
    }
    return state;
}
