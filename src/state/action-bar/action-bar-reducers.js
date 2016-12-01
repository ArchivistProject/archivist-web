import actionBarActionTypes from './action-bar-action-types';

const initialState = {
    backVisible: false,
    uploadVisible: false,
    searchVisible: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionBarActionTypes.VISIBILITIES_UPDATED: {
            const { backVisible, uploadVisible, searchVisible } = action.data;
            return {
                ...state,
                backVisible,
                uploadVisible,
                searchVisible,
            };
        }
    }
    return state;
}
