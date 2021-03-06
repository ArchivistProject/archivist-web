import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActionCreators from '~/src/state/home/home-action-creators';
import Home from './components/home';

class HomeConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Home
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

export default connect(mapStateToProps)(HomeConnector);
