import moment from 'moment';
import $ from 'jquery';
import config from '~/config';
import { APP_CONSTANTS } from '~/src/utils/app-constants';
import userActionTypes from '~/src/state/user/user-action-types';

export function formatDate(dateString) {
    let date = moment(dateString).format('MM/DD/YYYY');

    if (date === 'Invalid date') {
        date = '';
    }

    return date;
}

export function formatDateTime(dateString) {
    return moment(dateString).format('MM/DD/YYYY hh:mm:ss a Z');
}

export function ajax(type, url, data) {
    const token = localStorage.getItem(APP_CONSTANTS.AUTH_TOKEN);
    const params = {
        type,
        url: `${config.backend}/${url}`,
        data,
        headers: { Authorization: token },
    };
    if (type === 'POST') {
        params.data = JSON.stringify(data);
        params.dataType = 'json';
        params.contentType = 'application/json';
    } else if (type === 'DELETE') {
        params.dataType = 'json';
    }
    return $.ajax(params);
}

export function handleError(error, dispatch) {
    switch (error.status) {
        case 401: {
            dispatch({
                type: userActionTypes.AUTH_FAILED,
                notification: {
                    title: 'Authentication failed',
                    message: error.responseJSON.error,
                    level: 'error',
                },
                redirect: '/login',
            });
            break;
        }
        default: {
            console.log('API error: ', error);
            dispatch({
                type: 'Unknown error',
                notification: {
                    title: 'Unknown error',
                    message: `An unknown error occured: ${error.statusText}`,
                    level: 'error',
                },
            });
        }
    }
}

export function getFormattedPathname(pathname) {
    const formattedPathname = pathname.replace(/\/$/, '').split('/');
    if (/items\/\d*[a-zA-Z][a-zA-Z0-9]*$/.test(pathname)) {
        return 'viewer';
    }
    return formattedPathname.join('');
}

const invalidChars = ['\\', ';', '&']; // TODO
export function sanitizeString(string) {
    return string.split('').map(char => (invalidChars.indexOf(char) > -1 ? '' : char)).join('').trim();
}

export function isValidNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
}

export function throttle(callback, limit) {
    let wait = false;
    return () => {
        if (!wait) {
            callback.call();
            wait = true;
            setTimeout(() => { wait = false; }, limit);
        }
    };
}

export function getScrollbarWidth() {
    const inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);

    document.body.appendChild(outer);
    const w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let w2 = inner.offsetWidth;
    if (w1 === w2) {
        w2 = outer.clientWidth;
    }

    document.body.removeChild(outer);

    return (w1 - w2);
}

export function getDifference(array1, array2) {
    const array2Set = new Set(array2);
    return array1.filter(x => !array2Set.has(x));
}
