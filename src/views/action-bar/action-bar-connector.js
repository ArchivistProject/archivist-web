import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionBarActionCreators from '~/src/state/action-bar/action-bar-action-creators';
import ActionBar from './components/action-bar';

class ActionBarConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <ActionBar
                {...this.props}
                {...bindActionCreators(actionBarActionCreators, dispatch)}
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
