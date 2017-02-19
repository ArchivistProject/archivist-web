import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as userActionCreators from '~/src/state/user/user-action-creators';
import Login from './components/login';

class LoginConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Login
                {...this.props}
                {...bindActionCreators(userActionCreators, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.user,
    };
}

export default connect(mapStateToProps)(withRouter(LoginConnector));
