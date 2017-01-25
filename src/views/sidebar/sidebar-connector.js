import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sidebarActionCreators from '~/src/state/sidebar/sidebar-action-creators';
import { updateMetadata } from '~/src/state/item/item-action-creators';
import Sidebar from './components/sidebar';

class SidebarConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Sidebar
                {...this.props}
                {...bindActionCreators(sidebarActionCreators, dispatch)}
                {...bindActionCreators({ updateMetadata }, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.sidebar,
        ...state.item,
    };
}

export default connect(mapStateToProps)(SidebarConnector);
