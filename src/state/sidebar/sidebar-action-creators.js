import sidebarActionTypes from './sidebar-action-types';

export function updateVisibility(visible) {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.sidebar.visible) {
            dispatch({
                type: sidebarActionTypes.VISIBILITY_UPDATED,
                data: { visible },
            });
        }
    };
}
