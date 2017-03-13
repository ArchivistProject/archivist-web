export default {
    backend: process.env.NODE_ENV === 'development' ? 'https://localhost:3000' : window.location.origin,
};
