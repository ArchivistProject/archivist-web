export const VISIBILITIES = {
    '/': {
        backVisible: false,
        uploadVisible: true,
        searchVisible: true,
        settingsVisible: true,
    },
    '/upload': {
        backVisible: true,
        uploadVisible: false,
        searchVisible: false,
        settingsVisible: true,
    },
    '/settings': {
        backVisible: true,
        uploadVisible: true,
        searchVisible: false,
        settingsVisible: false,
    },
    '/login': {
        backVisible: false,
        uploadVisible: false,
        searchVisible: false,
        settingsVisible: false,
    },
};
