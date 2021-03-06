import { CONTENT_TYPES } from '~/src/state/viewer/viewer-constants';
import itemActionTypes from '../item/item-action-types';
import viewerActionTypes from './viewer-action-types';

const initialState = {
    scale: 1.0,
    scaleMax: 3.0,
    scaleMin: 0.3,
    currentPage: 1,
    numPages: 3, // TODO: set the number of pdf pages
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

        case itemActionTypes.FETCH_CONTENT_SUCCEEDED: {
            const { content, contentType } = action.data;
            return {
                ...state,
                numPages: contentType === CONTENT_TYPES.PDF ? content.numPages : null,
            };
        }
    }
    return state;
}
