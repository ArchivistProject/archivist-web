import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SettingsActionCreator from '~/src/state/settings/settings-action-creators';
import Settings from './components/settings';

class SettingsConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Settings
                {...this.props}
                {...bindActionCreators(SettingsActionCreator, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.settings,
    };
}

export default connect(mapStateToProps)(SettingsConnector);
