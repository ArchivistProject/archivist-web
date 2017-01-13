import actionBarActionTypes from './action-bar-action-types';
import { VISIBILITIES } from './action-bar-constants';

export function updateVisibilities(pathname) {
    return (dispatch, getState) => {
        const state = getState();


        if (!state.sidebar.visible) {
            dispatch({
                type: actionBarActionTypes.VISIBILITIES_UPDATED,
                data: { ...VISIBILITIES[pathname] },
            });
        }
    };
}
