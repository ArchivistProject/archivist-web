import { push } from 'react-router-redux';

export default ({ dispatch, getState }) => next => (action) => {
    if (action.redirect) {
        dispatch(push(action.redirect));
    }
    next(action);
};
