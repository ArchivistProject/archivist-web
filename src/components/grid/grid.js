import React, { PropTypes, Component } from 'react';
import './grid.scss';

export default class Grid extends Component {

    static propTypes = {
        headers: PropTypes.arrayOf(PropTypes.string),
        rows: PropTypes.arrayOf(PropTypes.object),
        onRowClick: PropTypes.func,
        onHeaderClick: PropTypes.func,
        activeRowNum: PropTypes.number,
        sortBy: PropTypes.object,
        noResultsText: PropTypes.string,
        noResultsImage: PropTypes.string,
        waitingForItems: PropTypes.bool,
    };

    handleHeaderClick = (header) => {
        const { onHeaderClick } = this.props;
        console.log(`sort by ${header}`);
        if (onHeaderClick) {
            onHeaderClick(header);
        }
    }

    handleRowClick = (rowNum) => {
        const { onRowClick } = this.props;
        onRowClick(rowNum);
    }

    renderHeaders() {
        const { headers } = this.props;
        return (
            <tr className='grid-header'>
                <th className='grid-header-item' onClick={() => { this.handleHeaderClick(headers[0]); w3.sortHTML('#file-list', '#item', 'td:nth-child(1)'); }}>{headers[0]}</th>
                <th className='grid-header-item' onClick={() => { this.handleHeaderClick(headers[1]); w3.sortHTML('#file-list', '#item', 'td:nth-child(2)'); }}>{headers[1]}</th>
                <th className='grid-header-item' onClick={() => { this.handleHeaderClick(headers[2]); w3.sortHTML('#file-list', '#item', 'td:nth-child(3)'); }}>{headers[2]}</th>
            </tr>
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
                <tr id='item' className={rowClasses.join(' ')} key={rowNum} onClick={() => this.handleRowClick(rowNum)}>
                    {
                        headers.map((header, columnNum) =>
                            <td className='grid-row-item' key={columnNum}>{row[header] ? row[header] : null}</td>
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
            <div className='grid-wrapper'>
                {rows && rows.length > 0 ? (
                    <table id='file-list' className='grid'>
                        <thead>
                            {this.renderHeaders()}
                        </thead>
                        <tbody className='grid-body'>{this.renderRows()}</tbody>
                    </table>
                ) : this.renderNoResults()}
            </div>
        );
    }
}
