import moment from 'moment';

export function formatDate(dateString) {
    return moment(dateString).format('MM/DD/YYYY');
}

export function formatDateTime(dateString) {
    return moment(dateString).format('MM/DD/YYYY hh:mm:ss a Z');
}

export function getFormattedPathname(pathname) {
    const formattedPathname = pathname.replace(/\/$/, '').split('/');
    if (/items\/[0-9][0-9]*/.test(pathname)) {
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
