import React, { PropTypes, Component } from 'react';
import './sidebar.scss';

export default class Sidebar extends Component {

    static propTypes = {
        activeItem: PropTypes.object,
        visible: PropTypes.bool.isRequired,
    };

    renderMetadata() {
        const { activeItem } = this.props;
        return Object.keys(activeItem).map((key, i) =>
            (
                <div className='sidebar-metadata-field' key={i}>
                    <span className='sidebar-metadata-label'>{key}:</span>
                    <span className='sidebar-metadata-value'>{activeItem[key]}</span>
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
