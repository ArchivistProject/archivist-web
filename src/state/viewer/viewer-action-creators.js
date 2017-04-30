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

export function addHighlight(highlighter, highlightId, text, note) {
    return (dispatch) => {
        console.log('api call', highlighter.serialize());
        dispatch({
            type: viewerActionTypes.HIGHLIGHT_ADDED,
            data: { highlightId, text, note },
        });
    };
}

export function editHighlight(highlight, note) {
    return (dispatch) => {
        console.log('api call');
        dispatch({
            type: viewerActionTypes.HIGHLIGHT_EDITED,
            data: { highlight, note },
        });
    };
}

export function viewerClosed() {
    return {
        type: viewerActionTypes.VIEWER_CLOSED,
    };
}
