import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActionCreators from '~/src/state/viewer/viewer-action-creators';
import Viewer from './components/viewer';

class ViewerConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Viewer
                {...this.props}
                {...bindActionCreators(homeActionCreators, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.home,
    };
}

export default connect(mapStateToProps)(ViewerConnector);
