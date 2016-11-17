import actionBarActionTypes from './action-bar-action-types';

const initialState = {
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionBarActionTypes.SOME_ACTION: {
            return {
                ...state,
            };
        }
    }
    return state;
}
