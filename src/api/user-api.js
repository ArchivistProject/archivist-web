import config from '~/config';
import $ from 'jquery';

export function login(username, password) {
    const payload = {
        email: username,
        password,
    };
    return $.post(`${config.backend}/authentication/login`, payload, response => response)
        .fail(error => error);
}
