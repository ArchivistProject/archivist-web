import config from '~/config';
import $ from 'jquery';

export function login(username, password) {
    const payload = {
        email: username,
        password,
    };
    return $.post(`${config.backend}/authentication/login`, payload);
}

export function checkAuth() {
    const token = localStorage.getItem('auth_token');
    return $.ajax({
        type: 'GET',
        url: `${config.backend}/authentication/status`,
        beforeSend: (xhr) => { xhr.setRequestHeader('Authorization', token); },
    });
}
