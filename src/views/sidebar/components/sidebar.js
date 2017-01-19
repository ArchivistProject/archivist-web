import React, { PropTypes, Component } from 'react';
import { formatDateTime } from '~/src/utils/utils';
import './sidebar.scss';

export default class Sidebar extends Component {

    static propTypes = {
        activeItem: PropTypes.object,
        visible: PropTypes.bool.isRequired,
    };

    renderMetadata() {
        const { activeItem } = this.props;
        return activeItem.metadata_fields.map((metadata, i) =>
            (
                <div className='sidebar-metadata-field' key={i}>
                    <span className='sidebar-metadata-label'>{metadata.name}:</span>
                    <span className='sidebar-metadata-value'>{metadata.type !== 'date' ? metadata.data : formatDateTime(metadata.data)}</span>
                </div>
            )
        );
    }

    render() {
        const { visible } = this.props;
        return visible ? (
            <div className='sidebar'>
                <div className='sidebar-metadata'>
                    {this.renderMetadata()}
                </div>
            </div>
        ) : null;
    }
}
