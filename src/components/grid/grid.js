import React, { PropTypes, Component } from 'react';
import './grid.scss';

export default class Grid extends Component {

    static propTypes = {
        headers: PropTypes.arrayOf(PropTypes.string),
        rows: PropTypes.arrayOf(PropTypes.object),
        onRowClick: PropTypes.func,
        activeRowNum: PropTypes.number,
        sortBy: PropTypes.string,
        noResultsText: PropTypes.string,
        noResultsImage: PropTypes.string,
        waitingForItems: PropTypes.bool,
        currentPage: PropTypes.number,
        sortOrder: PropTypes.string,
        saveSortOrder: PropTypes.func,
        saveHeaderClicked: PropTypes.func,
        fetchItems: PropTypes.func,
    };

    handleHeaderClick = (header) => {
        const { currentPage, sortOrder, saveSortOrder, saveHeaderClicked, fetchItems } = this.props;
        saveHeaderClicked(header);
        if (sortOrder === 'ascending') {
            saveSortOrder('descending');
        } else {
            saveSortOrder('ascending');
        }
        fetchItems(currentPage);
    }

    handleRowClick = (rowNum) => {
        const { onRowClick } = this.props;
        onRowClick(rowNum);
    }

    renderHeaders() {
        const { headers, sortBy, sortOrder } = this.props;
        return headers.map((header, key) =>
            (
                <th className='grid-header-item' key={key} onClick={() => this.handleHeaderClick(header)}>
                    {header}
                    {sortBy === header ?
                        <span className={sortOrder === 'ascending' ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down'} />
                    : null}
                </th>
            ),
        );
    }

    renderRows() {
        const { headers, rows, activeRowNum } = this.props;
        return rows.map((row, rowNum) => {
            const rowClasses = ['grid-row'];
            if (rowNum === activeRowNum) {
                rowClasses.push('grid-row-active');
            }
            return (
                <tr key={rowNum} onClick={() => this.handleRowClick(rowNum)}>
                    {
                        headers.map((header, columnNum) =>
                            <td key={columnNum}>{row[header] ? row[header] : null}</td>,
                        )
                    }
                </tr>
            );
        });
    }

    renderNoResults() {
        const { noResultsText, noResultsImage, waitingForItems } = this.props;
        return !waitingForItems ? (
            <div className='grid-noresults'>
                {noResultsImage ? <img src={noResultsImage} alt='noresults' /> : null }
                <span>{noResultsText || 'No results'}</span>
            </div>
        ) : null;
    }

    render() {
        const { rows } = this.props;
        return (
            <div>
                {rows && rows.length > 0 ? (
                    <div className='table-responsive-vertical shadow-z-1'>
                        <table className='table table-hover table-striped table-mc-purple'>
                            <thead>
                                <tr>
                                    {this.renderHeaders()}
                                </tr>
                            </thead>
                            <tbody>{this.renderRows()}</tbody>
                        </table>
                    </div>
                ) : this.renderNoResults()}
            </div>
        );
    }
}
