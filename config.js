export default {
    backend: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin,
    // TODO: switch to https when haproxy is setup with the ssl certs
    //backend: process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : window.location.origin,
};
