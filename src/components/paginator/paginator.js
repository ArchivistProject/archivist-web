import React, { PropTypes, Component } from 'react';
import './paginator.scss';

export default class Paginator extends Component {

    static propTypes = {
        currentPage: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
    };

    handlePageChange = (requestedPage) => {
        const { totalPages, onPageChange } = this.props;
        if (requestedPage > 0 && requestedPage <= totalPages) {
            // if user clicked on a header to sort already, then keep the sort order when fetching new page
            onPageChange(requestedPage);
        }
    }

    render() {
        const { currentPage, totalPages } = this.props;

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
                    className={currentPage === totalPages ? 'paginator-disabled' : ''}
                    disabled={currentPage === totalPages}
                    onClick={() => this.handlePageChange(currentPage + 1)}
                >
                    {'>'}
                </button>
                <button
                    className={currentPage === totalPages ? 'paginator-disabled' : ''}
                    disabled={currentPage === totalPages}
                    onClick={() => this.handlePageChange(totalPages)}
                >
                    {'>>'}
                </button>
            </div>
        : null
        );
    }
}
