import React from 'react';
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
        const notificationLinkParaStyle = {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        };
        const notificationButtonStyle = {
            background: 'rgb(235, 173, 26)',
            borderRadius: '2px',
            padding: '6px 20px',
            fontWeight: 'bold',
            margin: '10px 0px 0px',
            border: '0px',
            color: 'rgb(255, 255, 255)',
        };
        const notificationButtonCallback = () => {
            const win = window.open(url, '_blank');
            if (win) {
                win.focus();
            } else {
                dispatch({
                    type: viewerActionTypes.POPUPS_DISABLED,
                    notification: {
                        title: 'Please enable popups on this site to visit this link.',
                        level: 'error',
                    },
                });
            }
        };
        dispatch({
            type: viewerActionTypes.LINK_CLICKED,
            notification: {
                title: 'Clicked outside link',
                level: 'warning',
                children: (
                    <div>
                        Are you sure you want to visit:
                        <p style={notificationLinkParaStyle} title={url}>{url}</p>
                        <button style={notificationButtonStyle} onClick={notificationButtonCallback}>Yes</button>
                    </div>
                ),
                autoDismiss: 10,
            },
        });
    };
}
