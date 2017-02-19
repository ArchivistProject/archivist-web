export const VISIBILITIES = {
    '/': {
        backVisible: false,
        uploadVisible: true,
        searchVisible: true,
        settingsVisible: true,
        logoutVisible: true,
    },
    '/upload': {
        backVisible: true,
        uploadVisible: false,
        searchVisible: false,
        settingsVisible: true,
        logoutVisible: true,
    },
    '/settings': {
        backVisible: true,
        uploadVisible: true,
        searchVisible: false,
        settingsVisible: false,
        logoutVisible: true,
    },
    '/login': {
        backVisible: false,
        uploadVisible: false,
        searchVisible: false,
        settingsVisible: false,
        logoutVisible: false,
    },
};
