import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as userActionCreators from '~/src/state/user/user-action-creators';
import Home from './components/login';

class LoginConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Home
                {...this.props}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(LoginConnector);
