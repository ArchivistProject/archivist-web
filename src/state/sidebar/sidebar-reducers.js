import sidebarActionTypes from './sidebar-action-types';

const initialState = {
    visible: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case sidebarActionTypes.VISIBILITY_UPDATED: {
            const { visible } = action.data;
            return {
                ...state,
                visible,
            };
        }
    }
    return state;
}
