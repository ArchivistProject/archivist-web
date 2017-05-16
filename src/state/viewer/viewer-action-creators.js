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

export function viewerClosed() {
    return {
        type: viewerActionTypes.VIEWER_CLOSED,
    };
}

export function linkClicked(url) {
    return (dispatch) => {
        dispatch({
            type: viewerActionTypes.LINK_CLICKED,
            notification: {
                title: 'Clicking outside link',
                message: `Are you sure you want to visit ${url}`,
                level: 'warning',
                action: {
                    label: 'Yes',
                    callback: function() {
                        var win = window.open(url, '_blank');
                        if (win) {
                            win.focus();
                        } else {
                            dispatch({
                                type: viewerActionTypes.POPUPS_DISABLED,
                                notification: {
                                    title: 'Please enable popups on this site to visit this link.',
                                    level: 'error',
                                }
                            });
                        }
                    },
                },
            },
        });
    };
}
