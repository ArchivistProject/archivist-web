import React, { PropTypes, Component } from 'react';
import './grid.scss';

export default class Grid extends Component {

    static propTypes = {
        headers: PropTypes.arrayOf(PropTypes.object),
        rows: PropTypes.arrayOf(PropTypes.object),
        onRowClick: PropTypes.func,
        activeRowNum: PropTypes.number,
    };


    handleRowClick = (rowNum) => {
        const { onRowClick } = this.props;
        onRowClick(rowNum);
    }

    renderHeaders() {
        const { headers } = this.props;
        return headers.map((header, key) =>
            (
                <th className='grid-header-item' key={key}>{header.heading}</th>
            )
        );
    }

    renderRows() {
        const { headers, rows, activeRowNum } = this.props;
        const headerKeys = headers.map(header => header.key);
        return rows.map((row, rowNum) => {
            const rowClasses = ['grid-row'];
            if (rowNum === activeRowNum) {
                rowClasses.push('grid-row-active');
            }
            return (
                <tr className={rowClasses.join(' ')} key={rowNum} onClick={() => this.handleRowClick(rowNum)}>
                    {
                        headerKeys.map((headerKey, columnNum) =>
                            <td className='grid-row-item' key={columnNum}>{row[headerKey] ? row[headerKey] : null}</td>
                        )
                    }
                </tr>
            );
        });
    }

    render() {
        return (
            <div className='grid-wrapper'>
                <table className='grid'>
                    <thead>
                        <tr className='grid-header'>
                            {this.renderHeaders()}
                        </tr>
                    </thead>
                    <tbody className='grid-body'>{this.renderRows()}</tbody>
                </table>
            </div>
        );
    }
}
