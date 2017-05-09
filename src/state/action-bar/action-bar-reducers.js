import actionBarActionTypes from './action-bar-action-types';

const initialState = {
    backVisible: false,
    uploadVisible: false,
    searchVisible: false,
    settingsVisible: false,
    logoutVisible: false,
    simpleSearchQuery: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionBarActionTypes.VISIBILITIES_UPDATED: {
            const visibilities = action.data;
            return {
                ...state,
                ...visibilities,
            };
        }

        case actionBarActionTypes.SIMPLE_SEARCH_QUERY_UPDATED: {
            const { query } = action.data;
            return {
                ...state,
                simpleSearchQuery: query,
            };
        }
    }
    return state;
}
