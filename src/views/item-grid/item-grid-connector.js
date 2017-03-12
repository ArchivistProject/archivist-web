import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as itemActionCreators from '~/src/state/item/item-action-creators';
import ItemGrid from './components/item-grid';

class ItemGridConnector extends Component {
    render() {
        const { dispatch } = this.props;
        return (
            <ItemGrid
                {...this.props}
                {...bindActionCreators(itemActionCreators, dispatch)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.item,
        queryPage: Number(state.routing.locationBeforeTransitions.query.page),
    };
}

export default connect(mapStateToProps)(ItemGridConnector);
