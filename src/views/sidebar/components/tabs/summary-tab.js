import React, { PropTypes, Component } from 'react';
import { formatDate } from '~/src/utils/utils';
import { SIDEBAR_TABS } from '~/src/state/sidebar/sidebar-constants';
import './summary-tab.scss';

export default class SummaryTab extends Component {

    static propTypes = {
        activeItem: PropTypes.object,
        visibleTab: PropTypes.string.isRequired,
    };


    render() {
        const { activeItem, visibleTab } = this.props;

        return visibleTab === SIDEBAR_TABS.SUMMARY ? (
            <table className='summary-tab'>
                <tbody>
                    {activeItem.metadata_fields.map((metadata, i) =>
                        (
                            <tr className='sidebar-tab summary-tab-row' key={i}>
                                <td className='summary-tab-label'>{metadata.name}</td>
                                <td className='summary-tab-value'>{metadata.type !== 'date' ? metadata.data : formatDate(metadata.data)}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        ) : null;
    }
}
