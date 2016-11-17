import homeActionTypes from './home-action-types';

const initialState = {
};

export default function (state = initialState, action) {
    switch (action.type) {
        case homeActionTypes.SOME_ACTION: {
            return {
                ...state,
            };
        }
    }
    return state;
}
