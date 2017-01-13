import actionBarActionTypes from './action-bar-action-types';
import { VISIBILITIES } from './action-bar-constants';

export function updateVisibilities(pathname) {
    return (dispatch, getState) => {
        const state = getState();

        const defaultVisibilities = {
            backVisible: false,
            uploadVisible: false,
            searchVisible: false,
            settingsVisible: false,
        };

        const visibilities = {
            ...defaultVisibilities,
            ...VISIBILITIES[pathname],
        };

        if (!state.sidebar.visible) {
            dispatch({
                type: actionBarActionTypes.VISIBILITIES_UPDATED,
                data: { visibilities },
            });
        }
    };
}
