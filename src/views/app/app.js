import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import { ActionBar } from '~/src/views';


class App extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        notifications: PropTypes.array,
        history: PropTypes.object.isRequired,
    };

    render() {
        const { children, notifications, history } = this.props;
        return (
            <div id='app'>
                <ActionBar history={history} />
                <div>{children}</div>
                <Notifications notifications={notifications} />
            </div>
        );
    }
}

export default connect(state => ({ notifications: state.notifications }))(App);
