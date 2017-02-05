import actionBarActionTypes from './action-bar-action-types';
import { VISIBILITIES } from './action-bar-constants';

export function updateVisibilities(pathname) {
    console.log(pathname);
    return {
        type: actionBarActionTypes.VISIBILITIES_UPDATED,
        data: { ...VISIBILITIES[pathname] },
    };
}
