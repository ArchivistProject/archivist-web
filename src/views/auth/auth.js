import React, { PropTypes, Component } from 'react';

export default class Auth extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        loggedIn: PropTypes.bool.isRequired,
        checkAuth: PropTypes.func.isRequired,
        router: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { loggedIn, checkAuth, router } = this.props;
        if (!loggedIn) {
            checkAuth(router);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { checkAuth, router } = this.props;
        checkAuth(router);
    }

    render() {
        return this.props.children;
    }
}
