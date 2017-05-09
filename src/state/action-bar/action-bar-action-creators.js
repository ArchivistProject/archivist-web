import actionBarActionTypes from './action-bar-action-types';
import { VISIBILITIES } from './action-bar-constants';

export function updateVisibilities(pathname) {
    return {
        type: actionBarActionTypes.VISIBILITIES_UPDATED,
        data: { ...VISIBILITIES[pathname] },
    };
}

export function updateSimpleSearchQuery(query) {
    return {
        type: actionBarActionTypes.SIMPLE_SEARCH_QUERY_UPDATED,
        data: { query },
    };
}
