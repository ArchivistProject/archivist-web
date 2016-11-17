import sidebarActionTypes from './sidebar-action-types';

const initialState = {
};

export default function (state = initialState, action) {
    switch (action.type) {
        case sidebarActionTypes.SOME_ACTION: {
            return {
                ...state,
            };
        }
    }
    return state;
}
