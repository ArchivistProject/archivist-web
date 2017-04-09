import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionBarActionCreators from '~/src/state/action-bar/action-bar-action-creators';
import * as sidebarActionCreators from '~/src/state/sidebar/sidebar-action-creators';
import * as searchActionCreators from '~/src/state/search/search-action-creators';
import { logout } from '~/src/state/user/user-action-creators';
import ActionBar from './components/action-bar';

class ActionBarConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <ActionBar
                {...this.props}
                {...bindActionCreators(actionBarActionCreators, dispatch)}
                {...bindActionCreators({ logout }, dispatch)}
                {...bindActionCreators(sidebarActionCreators, dispatch)}
                {...bindActionCreators(searchActionCreators, dispatch)}
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

export default connect(mapStateToProps)(ActionBarConnector);
