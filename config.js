export default {
    backend: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin,
};
