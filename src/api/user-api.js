import { ajax } from '~/src/utils/utils';

export function login(username, password) {
    const data = {
        email: username,
        password,
    };
    return ajax('POST', 'authentication/login', data);
}

export function checkAuth() {
    return ajax('GET', 'authentication/status');
}
