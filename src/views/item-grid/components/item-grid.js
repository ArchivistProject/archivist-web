import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import Grid from '~/src/components/grid/grid';
import Paginator from '~/src/components/paginator/paginator';
import Loader from '~/src/components/loader/loader';
import { formatDate } from '~/src/utils/utils';
import SadFace from '~/src/assets/images/sadface.png';
import './item-grid.scss';

export default class ItemGrid extends Component {

    static propTypes = {
        items: PropTypes.arrayOf(Object),
        headers: PropTypes.arrayOf(Object),
        fetchItems: PropTypes.func.isRequired,
        itemFocused: PropTypes.func.isRequired,
        activeItemId: PropTypes.string,
        activeItemIndex: PropTypes.number,
        waitingForItems: PropTypes.bool,
        fetchItemsFailed: PropTypes.bool,
        meta: PropTypes.shape({
            currentPage: PropTypes.number,
            nextPage: PropTypes.number,
            prevPage: PropTypes.number,
            totalPages: PropTypes.number,
            totalCount: PropTypes.number,
            pageSize: PropTypes.number,
        }),
        queryPage: PropTypes.number,
        sortOrder: PropTypes.string,
        saveSortOrder: PropTypes.func.isRequired,
        saveHeaderClicked: PropTypes.func.isRequired,
        sortBy: PropTypes.string,
    };

    componentWillMount() {
        const { fetchItems, queryPage, meta: { currentPage } } = this.props;
        const pageToFetch = currentPage || queryPage || 1;
        fetchItems(pageToFetch);
    }

    componentDidUpdate() {
        const { fetchItems, meta: { currentPage, totalPages } } = this.props;
        if (currentPage && currentPage > totalPages) {
            fetchItems(1);
        }
    }

    render() {
        const { items, headers, itemFocused, fetchItems, activeItemIndex, waitingForItems, fetchItemsFailed, sortOrder, sortBy, saveSortOrder, saveHeaderClicked,
            meta: { currentPage, nextPage, prevPage, totalPages, totalCount, pageSize } } = this.props;
        let rows = [];

        if (fetchItemsFailed) {
            return (
                <div className='item-grid-wrapper'>
                    <span className='item-grid-text'>Failed to retrieve items from server.</span>
                </div>
            );
        }

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

        const startIndex = (((currentPage - 1) * pageSize) + 1);
        const endIndex = ((startIndex + rows.length) - 1);
        return (
            <div className='item-grid-wrapper'>
                <Loader visible={waitingForItems} />
                { rows.length ? (
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        fetchItems={fetchItems}
                    />) : null }
                <div className='item-grid'>
                    <Grid
                        currentPage={currentPage}
                        headers={headers}
                        rows={rows}
                        onRowClick={itemFocused}
                        fetchItems={fetchItems}
                        activeRowNum={activeItemIndex}
                        noResultsText={'No results'}
                        noResultsImage={SadFace}
                        waitingForItems={waitingForItems}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        saveSortOrder={saveSortOrder}
                        saveHeaderClicked={saveHeaderClicked}
                    />
                </div>
                { rows.length ? <span className='item-grid-count'>{`Displaying items ${startIndex}-${endIndex} of ${totalCount}`}</span> : null }
            </div>
        );
    }
}
