import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as userActionCreators from '~/src/state/user/user-action-creators';
import Auth from './auth';

class AuthConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Auth
                {...this.props}
                {...bindActionCreators(userActionCreators, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.user,
        redirect: state.routing.locationBeforeTransitions.pathname,
    };
}

export default connect(mapStateToProps)(withRouter(AuthConnector));
