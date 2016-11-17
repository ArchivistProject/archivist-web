import React, { PropTypes, Component } from 'react';
import Grid from '~/src/components/grid/grid';
import './item-grid.scss';

export default class ItemGrid extends Component {

    static propTypes = {
        someAction: PropTypes.func.isRequired,
    };

    render() {
        // placeholder headers
        const headers = [
            {
                key: 'title',
                heading: 'Title',
            },
            {
                key: 'dateAdded',
                heading: 'Date Added',
            },
            {
                key: 'author',
                heading: 'Author',
            },
        ];

        // placeholder items w/metadata
        const items = [
            {
                // title: 'Title 1',
                dateAdded: '11/12/16',
                author: 'Author 1',
                someMetadata: 'aaa',
            },
            {
                title: 'Title 2',
                dateAdded: '11/16/16',
                author: 'Author 2',
                extraData: 'something',
            },
        ];

        return (
            <Grid
                headers={headers}
                rows={items}
            />
        );
    }
}
