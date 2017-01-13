import actionBarActionTypes from './action-bar-action-types';

export function updateVisibility(visible) {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.sidebar.visible) {
            dispatch({
                type: actionBarActionTypes.VISIBILITIES_UPDATED,
            });
        }
    };
}
