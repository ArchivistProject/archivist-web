import React, { PropTypes, Component } from 'react';

export default class Auth extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        loggedIn: PropTypes.bool.isRequired,
        checkAuth: PropTypes.func.isRequired,
        redirect: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { loggedIn, checkAuth, redirect, history } = this.props;
        if (!loggedIn) {
            checkAuth(redirect, history);
        }
    }

    render() {
        return this.props.children;
    }
}
