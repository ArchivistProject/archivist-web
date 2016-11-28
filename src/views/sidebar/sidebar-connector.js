import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sidebarActionCreators from '~/src/state/sidebar/sidebar-action-creators';
import Sidebar from './components/sidebar';

class SidebarConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Sidebar
                {...this.props}
                {...bindActionCreators(sidebarActionCreators, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.sidebar,
        ...state.home,
    };
}

export default connect(mapStateToProps)(SidebarConnector);
