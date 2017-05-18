import * as itemApi from '~/src/api/item-api';
import { handleError } from '~/src/utils/utils';
import viewerActionTypes from './viewer-action-types';

export function updateScale(increment) {
    if (increment) {
        return {
            type: viewerActionTypes.SCALE_INCREMENTED,
        };
    }
    return {
        type: viewerActionTypes.SCALE_DECREMENTED,
    };
}

export function resetScale() {
    return {
        type: viewerActionTypes.SCALE_RESET,
    };
}

export function updatePage(pageRequested) {
    return {
        type: viewerActionTypes.PAGE_UPDATED,
        data: { pageRequested },
    };
}

export function addHighlight(highlighter, highlightId, numElements, startPos, text, note) {
    return (dispatch, getState) => {
        const { item: { activeItem } } = getState();
        itemApi.addNote(activeItem, highlighter.serialize(), highlightId, numElements, startPos, text, note)
            .then((response) => {
                const { id } = response;
                const { $oid: oid } = id[0];
                dispatch({
                    type: viewerActionTypes.HIGHLIGHT_ADDED,
                    data: { highlighter, highlightId, text, note, numElements, startPos, id: oid },
                });
            })
            .catch(error => handleError(error, dispatch));
    };
}

export function editHighlight(highlight, note) {
    return (dispatch, getState) => {
        const { item: { activeItem } } = getState();
        itemApi.editNote(activeItem, highlight.id, note)
            .then((response) => {
                dispatch({
                    type: viewerActionTypes.HIGHLIGHT_EDITED,
                    data: { highlight, note },
                });
            });
    };
}

export function deleteHighlight(highlighter, highlight) {
    return (dispatch, getState) => {
        const { item: { activeItem } } = getState();
        itemApi.deleteNote(activeItem, highlighter.serialize(), highlight.highlightId, highlight.id)
            .then((response) => {
        //         dispatch({
        //             type: viewerActionTypes.HIGHLIGHT_DELETED,
        //             data: { highlighter, highlight },
                // });
            });
    };
}

export function viewerClosed() {
    return {
        type: viewerActionTypes.VIEWER_CLOSED,
    };
}
