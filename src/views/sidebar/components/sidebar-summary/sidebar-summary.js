import React, { PropTypes, Component } from 'react';
import { formatDate } from '~/src/utils/utils';
import './sidebar-summary.scss';

export default class SidebarSummary extends Component {

    static propTypes = {
        activeItem: PropTypes.object.isRequired,
    };

    render() {
        const { activeItem } = this.props;

        return (
            <table className='sidebar-summary'>
                <tbody>
                    {activeItem.metadata_fields.map((metadata, i) =>
                        (
                            <tr className='sidebar-tab sidebar-summary-row' key={i}>
                                <td className='sidebar-summary-label'>{metadata.name}</td>
                                <td className='sidebar-summary-value'>{metadata.type !== 'date' ? metadata.data : formatDate(metadata.data)}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        );
    }
}
