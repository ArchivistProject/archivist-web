import sidebarActionTypes from './sidebar-action-types';
import { SIDEBAR_TABS } from './sidebar-constants';

const initialState = {
    visible: false,
    visibleTab: SIDEBAR_TABS.SUMMARY,
    editMode: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case sidebarActionTypes.VISIBILITY_UPDATED: {
            const { visible } = action.data;
            return {
                ...state,
                visible,
                visibleTab: visible ? state.visibleTab : initialState.visibleTab,
            };
        }
        case sidebarActionTypes.VISIBLE_TAB_UPDATED: {
            const { tabName } = action.data;
            return {
                ...state,
                visibleTab: tabName,
            };
        }
        case sidebarActionTypes.EDIT_MODE_TOGGLED: {
            return {
                ...state,
                editMode: !state.editMode,
            };
        }
        case sidebarActionTypes.METADATA_UPDATED: {
            console.log(action.data);
            return {
                ...state,
            };
        }

    }
    return state;
}
