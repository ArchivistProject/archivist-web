import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import * as actionBarActionCreators from '~/src/state/action-bar/action-bar-action-creators';
import { logout } from '~/src/state/user/user-action-creators';
import ActionBar from './components/action-bar';

class ActionBarConnector extends Component {
    render() {
        const { dispatch } = this.props;
        console.log(this.props);
        return (
            <ActionBar
                {...this.props}
                {...bindActionCreators(actionBarActionCreators, dispatch)}
                {...bindActionCreators({ logout }, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.actionBar,
        pathname: state.routing.locationBeforeTransitions.pathname,
    };
}

export default connect(mapStateToProps)(withRouter(ActionBarConnector));
