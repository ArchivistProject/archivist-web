import { CONTENT_TYPES } from '~/src/state/viewer/viewer-constants';
import itemActionTypes from '../item/item-action-types';
import viewerActionTypes from './viewer-action-types';

const initialState = {
    scale: 1.0,
    scaleMax: 3.0,
    scaleMin: 1.0,
    currentPage: 1,
    numPages: 3, // TODO: set the number of pdf pages
    highlighter: '',
    highlights: [],
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
            const { highlighter, highlightId, text, note, id } = action.data;
            console.log(highlightId);

            return {
                ...state,
                highlights: [...state.highlights, { highlightId, text, note, id }].sort((a, b) => a.highlightId - b.highlightId),
                highlighter: highlighter.serialize(),
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
            const { highlighter, highlight } = action.data;
            const { highlights } = state;
            const highlightIndex = highlights.map(hl => hl.highlightId).indexOf(highlight.highlightId);
            return {
                ...state,
                highlights: [
                    ...highlights.slice(0, highlightIndex),
                    ...highlights.slice(highlightIndex + 1, highlights.length),
                ],
                highlighter: highlighter.serialize(),
            };
        }

        case itemActionTypes.FETCH_ITEM_SUCCEEDED: {
            const { document: { highlighter, notes: highlights } } = action.data;

            return {
                ...state,
                highlighter,
                highlights: highlights.sort((a, b) => a.highlightId - b.highlightId),
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
