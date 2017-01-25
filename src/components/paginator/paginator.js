import React, { PropTypes, Component } from 'react';
import './paginator.scss';

export default class Paginator extends Component {

    static propTypes = {
        currentPage: PropTypes.number,
        nextPage: PropTypes.number,
        prevPage: PropTypes.number,
        totalPages: PropTypes.number,
        onPageChange: PropTypes.func.isRequired,
    };

    handlePageChange = (requestedPage) => {
        const { totalPages, onPageChange } = this.props;
        if (requestedPage > 0 && requestedPage <= totalPages) {
            onPageChange(requestedPage);
        }
    }

    render() {
        const { currentPage, nextPage, totalPages } = this.props;

        const noPrev = currentPage === 1;

        return (totalPages ?
            <div className='paginator'>
                <button
                    className={noPrev ? 'paginator-disabled' : ''}
                    disabled={noPrev}
                    onClick={() => this.handlePageChange(1)}
                >
                    {'<<'}
                </button>
                <button
                    className={noPrev ? 'paginator-disabled' : ''}
                    disabled={noPrev}
                    onClick={() => this.handlePageChange(currentPage - 1)}
                >
                    {'<'}
                </button>
                <span className='paginator-current'>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className={!nextPage ? 'paginator-disabled' : ''}
                    disabled={!nextPage}
                    onClick={() => this.handlePageChange(currentPage + 1)}
                >
                    {'>'}
                </button>
                <button
                    className={!nextPage ? 'paginator-disabled' : ''}
                    disabled={!nextPage}
                    onClick={() => this.handlePageChange(totalPages)}
                >
                    {'>>'}
                </button>
            </div>
        : null
        );
    }
}
