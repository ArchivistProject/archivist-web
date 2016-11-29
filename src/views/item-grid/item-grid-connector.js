import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActionCreators from '~/src/state/home/home-action-creators';
import ItemGrid from './components/item-grid';

class ItemGridConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <ItemGrid
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

export default connect(mapStateToProps)(ItemGridConnector);
