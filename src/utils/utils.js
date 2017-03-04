import moment from 'moment';
import $ from 'jquery';
import config from '~/config';
import { APP_CONSTANTS } from '~/src/utils/app-constants';
import userActionTypes from '~/src/state/user/user-action-types';

export function formatDate(dateString) {
    return moment(dateString).format('MM/DD/YYYY');
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
