import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Settings from './components/settings';

class SettingsConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Settings
                {...this.props}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(SettingsConnector);
