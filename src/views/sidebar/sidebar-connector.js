import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sidebarActionCreators from '~/src/state/sidebar/sidebar-action-creators';
import * as itemActionCreators from '~/src/state/item/item-action-creators';
import { fetchItemTypes } from '~/src/state/settings/settings-action-creators';
import Sidebar from './components/sidebar';

class SidebarConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Sidebar
                {...this.props}
                {...bindActionCreators(sidebarActionCreators, dispatch)}
                {...bindActionCreators(itemActionCreators, dispatch)}
                {...bindActionCreators({ fetchItemTypes }, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.sidebar,
        ...state.item,
        ...state.search,
        itemTypes: state.settings.groups,
    };
}

export default connect(mapStateToProps)(SidebarConnector);
