import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewerActionCreators from '~/src/state/viewer/viewer-action-creators';
import * as itemActionCreators from '~/src/state/item/item-action-creators';
import Viewer from './components/viewer';

class ViewerConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Viewer
                {...this.props}
                {...bindActionCreators(viewerActionCreators, dispatch)}
                {...bindActionCreators(itemActionCreators, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.viewer,
        ...state.item,
    };
}

export default connect(mapStateToProps)(ViewerConnector);
