import actionBarActionTypes from './action-bar-action-types';

const initialState = {
    backVisible: false,
    uploadVisible: false,
    searchVisible: false,
    settingsVisible: false,
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
    }
    return state;
}
