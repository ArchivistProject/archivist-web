import moment from 'moment';
import $ from 'jquery';
import config from '~/config';


export function formatDate(dateString) {
    return moment(dateString).format('MM/DD/YYYY');
}

export function formatDateTime(dateString) {
    return moment(dateString).format('MM/DD/YYYY hh:mm:ss a Z');
}

export function ajax(type, url, data) {
    const token = localStorage.getItem('auth_token');
    const params = {
        type,
        url: `${config.backend}/${url}`,
        data,
        headers: { Authorization: token },
    };
    return $.ajax(params)
        .then(response => response)
        .catch(error => error.responseJSON);
}
