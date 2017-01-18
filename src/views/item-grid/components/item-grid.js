import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import Grid from '~/src/components/grid/grid';
import { formatDate } from '~/src/utils/utils';
import './item-grid.scss';

export default class ItemGrid extends Component {

    static propTypes = {
        items: PropTypes.arrayOf(Object),
        headers: PropTypes.arrayOf(Object),
        fetchItems: PropTypes.func.isRequired,
        itemFocused: PropTypes.func.isRequired,
        headerClicked: PropTypes.func.isRequired,
        activeItemId: PropTypes.number,
        meta: PropTypes.shape({
            currentPage: PropTypes.number,
            nextPage: PropTypes.number,
            prevPage: PropTypes.number,
            totalPages: PropTypes.number,
        }),
    };

    componentWillMount() {
        const { fetchItems } = this.props;
        fetchItems();
    }

    render() {
        const { items, headers, itemFocused, headerClicked, activeItemId, meta } = this.props;
        let rows = [];

        if (items) {
            rows = items.map((item, itemIndex) => {
                const row = {};
                item.metadata_fields.forEach((metadata) => {
                    if (metadata && metadata.name && metadata.data) {
                        row[metadata.name] = metadata.type !== 'date' ? metadata.data : formatDate(metadata.data);
                    }
                });
                return row;
            });
        }

        return (
            <Grid
                headers={headers}
                rows={rows}
                onRowClick={itemFocused}
                onHeaderClick={headerClicked}
                activeRowNum={activeItemId}
                noResultsText={'You don\'t have any files yet!'}
            />
        );
    }
}
