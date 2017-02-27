import viewerActionTypes from './viewer-action-types';

const initialState = {
    scale: 1.0,
    scaleMax: 3.0,
    scaleMin: 0.3,
    currentPage: 1,
    numPages: 3, // TODO
};

export default function (state = initialState, action) {
    switch (action.type) {
        case viewerActionTypes.VIEWER_OPENED: {
            return {
                ...state,
                currentPage: initialState.currentPage,
            };
        }
        case viewerActionTypes.SCALE_INCREMENTED: {
            return {
                ...state,
                scale: state.scale < state.scaleMax ? Math.round((state.scale + 0.1) * 10) / 10 : state.scale,
            };
        }
        case viewerActionTypes.SCALE_DECREMENTED: {
            return {
                ...state,
                scale: state.scale > state.scaleMin ? Math.round((state.scale - 0.1) * 10) / 10 : state.scale,
            };
        }
        case viewerActionTypes.SCALE_RESET: {
            return {
                ...state,
                scale: initialState.scale,
            };
        }
        case viewerActionTypes.PAGE_UPDATED: {
            const { pageRequested } = action.data;
            return {
                ...state,
                currentPage: pageRequested,
            };
        }
    }
    return state;
}
