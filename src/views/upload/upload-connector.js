import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uploadActionCreators from '~/src/state/upload/upload-action-creators';
import Upload from './components/upload';

class UploadConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Upload
                {...this.props}
                {...bindActionCreators(uploadActionCreators, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(UploadConnector);
