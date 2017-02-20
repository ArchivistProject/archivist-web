import React, { PropTypes, Component } from 'react';

export default class Auth extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        loggedIn: PropTypes.bool.isRequired,
        checkAuth: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { loggedIn, checkAuth } = this.props;
        if (!loggedIn) {
            checkAuth();
        }
    }

    render() {
        return this.props.children;
    }
}
