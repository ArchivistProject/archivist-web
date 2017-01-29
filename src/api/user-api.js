import config from '~/config';
import $ from 'jquery';

export function login(username, password) {
    const payload = {
        email: 'foo@example.com',
        password: 'foo',
    };
    $.post(`${config.backend}/authentication/login`, payload);
}
