import sidebarActionTypes from './sidebar-action-types';

export function updateVisibility(visible) {
    return {
        type: sidebarActionTypes.VISIBILITY_UPDATED,
        data: { visible },
    };
}

export function updateTabVisibility(tabName) {
    return {
        type: sidebarActionTypes.VISIBLE_TAB_UPDATED,
        data: { tabName },
    };
}
