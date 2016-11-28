import React, { PropTypes, Component } from 'react';
import Grid from '~/src/components/grid/grid';
import './item-grid.scss';

export default class ItemGrid extends Component {

    static propTypes = {
        items: PropTypes.arrayOf(Object),
        headers: PropTypes.arrayOf(Object),
        itemFocused: PropTypes.func.isRequired,
        activeItemId: PropTypes.number,
    };

    render() {
        const { items, headers, itemFocused, activeItemId } = this.props;

        return (
            <Grid
                headers={headers}
                rows={items}
                onRowClick={itemFocused}
                activeRowNum={activeItemId}
            />
        );
    }
}
