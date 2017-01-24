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

export function toggleEditMode() {
    return {
        type: sidebarActionTypes.EDIT_MODE_TOGGLED,
    };
}

export function updateMetadata(activeItem, metadata, value) {
    return {
        type: sidebarActionTypes.METADATA_UPDATED,
        data: { activeItem, metadata, value },
    };
}
