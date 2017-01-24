import React, { PropTypes, Component } from 'react';
import { formatDate } from '~/src/utils/utils';
import { canEditMetadata } from '~/src/state/user/privileges';
import './summary-tab.scss';

export default class SummaryTab extends Component {

    static propTypes = {
        activeItem: PropTypes.object.isRequired,
        toggleEditMode: PropTypes.func.isRequired,
        updateMetadata: PropTypes.func.isRequired,
        editMode: PropTypes.bool.isRequired,
    };

    handleEditClicked = () => {
        const { toggleEditMode } = this.props;
        toggleEditMode();
    }

    handleMetadataEdited = (metadata, value) => {
        const { activeItem, updateMetadata } = this.props;
        updateMetadata(activeItem, metadata, value);
    }

    renderMetadataRow(metadata, i) {
        const { editMode } = this.props;

        return (
            <tr className='sidebar-tab summary-tab-row' key={i}>
                <td className='summary-tab-label'>{metadata.name}</td>
                <td className='summary-tab-value'>
                    {editMode ? <input value={metadata.type !== 'date' ? metadata.data : formatDate(metadata.data)} onChange={value => this.handleMetadataEdited(metadata, value)} />
                    : <div>{metadata.type !== 'date' ? metadata.data : formatDate(metadata.data)}</div>}
                </td>
            </tr>
        );
    }

    renderEditControls() {
        const { editMode } = this.props;
        if (editMode) {
            return (
                <button className='summary-tab-edit' onClick={this.handleEditClicked}>Save</button>
            );
        }
        return (
            <button className='summary-tab-edit' onClick={this.handleEditClicked}>Edit</button>
        );
    }

    render() {
        const { activeItem } = this.props;

        return (
            <div className='summary-tab'>
                <table className='summary-tab-table'>
                    <tbody>
                        {activeItem.metadata_fields.map((metadata, i) => this.renderMetadataRow(metadata, i))}
                    </tbody>
                </table>
                { canEditMetadata ? this.renderEditControls() : null }
            </div>
        );
    }
}
