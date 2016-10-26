const SOME_ACTION = 'home/SOME_ACTION';

export function someAction() {
    return {
        type: SOME_ACTION,
    };
}

const initialState = {
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SOME_ACTION: {
            return {
                ...state,
            };
        }
    }
    return state;
}
