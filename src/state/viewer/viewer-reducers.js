import { CONTENT_TYPES } from '~/src/state/viewer/viewer-constants';
import itemActionTypes from '../item/item-action-types';
import viewerActionTypes from './viewer-action-types';

const initialState = {
    scale: 1.0,
    scaleMax: 3.0,
    scaleMin: 1.0,
    currentPage: 1,
    numPages: 3, // TODO: set the number of pdf pages
    // highlights: [],
    highlights: [
        {
            highlightId: 'r1sCqnX1W',
            text: 'I am!',
            note: 'abc',
        },
        {
            highlightId: 'HJTAcnmyW',
            text: 'foo ',
            note: '123',
        },
    ],
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

        case viewerActionTypes.HIGHLIGHT_ADDED: {
            const { highlightId, text, note } = action.data;

            return {
                ...state,
                highlights: [...state.highlights, { highlightId, text, note }],
            };
        }

        case viewerActionTypes.HIGHLIGHT_EDITED: {
            const { highlight, note } = action.data;
            const { highlights } = state;
            const highlightIndex = highlights.map(hl => hl.highlightId).indexOf(highlight.highlightId);
            return {
                ...state,
                highlights: [
                    ...highlights.slice(0, highlightIndex),
                    { ...highlight, note },
                    ...highlights.slice(highlightIndex + 1, highlights.length),
                ],
            };
        }

        case viewerActionTypes.HIGHLIGHT_DELETED: {
            const { highlight } = action.data;
            const { highlights } = state;
            const highlightIndex = highlights.map(hl => hl.highlightId).indexOf(highlight.highlightId);
            return {
                ...state,
                highlights: [
                    ...highlights.slice(0, highlightIndex),
                    ...highlights.slice(highlightIndex + 1, highlights.length),
                ],
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
