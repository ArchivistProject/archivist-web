import config from '~/config';
import $ from 'jquery';

export function login(username, password) {
    const payload = {
        email: username,
        password,
    };
    $.post(`${config.backend}/authentication/login`, payload);
}
