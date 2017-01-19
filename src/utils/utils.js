import moment from 'moment';

export function formatDate(dateString) {
    return moment(dateString).format('MM/DD/YYYY');
}

export function formatDateTime(dateString) {
    return moment(dateString).format('MM/DD/YYYY hh:mm:ss a Z');
}
