import sidebarActionTypes from './sidebar-action-types';

export function updateVisibility(visible, unfocusItem) {
    return {
        type: sidebarActionTypes.VISIBILITY_UPDATED,
        data: { visible, unfocusItem },
    };
}

export function updateTabVisibility(tabName) {
    return {
        type: sidebarActionTypes.VISIBLE_TAB_UPDATED,
        data: { tabName },
    };
}

export function toggleMetadataEditMode() {
    return {
        type: sidebarActionTypes.METADATA_EDIT_MODE_TOGGLED,
    };
}

export function toggleDescriptionEditMode() {
    return {
        type: sidebarActionTypes.DESCRIPTION_EDIT_MODE_TOGGLED,
    };
}
