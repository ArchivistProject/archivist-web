import Notifications from 'react-notification-system-redux';

export default ({ dispatch, getState }) => next => (action) => {
    const { notification } = action;
    // Should be in the form:
    // notification: {
    //     title: 'Notification Title',
    //     message: 'Notification message',
    //     level: 'success', 'error', 'warning', or 'info',
    // }
    if (notification) {
        dispatch(Notifications[notification.level](notification));
    }
    next(action);
};
