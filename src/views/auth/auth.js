import React, { PropTypes, Component } from 'react';

export default class Auth extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        loggedIn: PropTypes.bool.isRequired,
        checkAuth: PropTypes.func.isRequired,
        redirect: PropTypes.string.isRequired,
        router: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { loggedIn, checkAuth, redirect, router } = this.props;
        if (!loggedIn) {
            checkAuth(redirect, router);
        }
    }

    render() {
        return this.props.children;
    }
}
