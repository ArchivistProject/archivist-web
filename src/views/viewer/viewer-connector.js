import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewerActionCreators from '~/src/state/viewer/viewer-action-creators';
import { fetchItem } from '~/src/state/item/item-action-creators';
import { updateVisibility } from '~/src/state/sidebar/sidebar-action-creators';
import Viewer from './components/viewer';

class ViewerConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Viewer
                {...this.props}
                {...bindActionCreators(viewerActionCreators, dispatch)}
                {...bindActionCreators({ fetchItem, updateVisibility }, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.viewer,
        ...state.item,
        sidebarVisible: state.sidebar.visible,
    };
}

export default connect(mapStateToProps)(ViewerConnector);
