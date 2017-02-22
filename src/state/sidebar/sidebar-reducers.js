import sidebarActionTypes from './sidebar-action-types';
import { SIDEBAR_TABS } from './sidebar-constants';

const initialState = {
    visible: false,
    visibleTab: SIDEBAR_TABS.SUMMARY,
    metadataEditMode: false,
    descriptionEditMode: false,
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
        case sidebarActionTypes.METADATA_EDIT_MODE_TOGGLED: {
            return {
                ...state,
                metadataEditMode: !state.metadataEditMode,
            };
        }
        case sidebarActionTypes.DESCRIPTION_EDIT_MODE_TOGGLED: {
            return {
                ...state,
                descriptionEditMode: !state.descriptionEditMode,
            };
        }
    }
    return state;
}
