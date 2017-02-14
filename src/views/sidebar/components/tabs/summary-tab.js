import React, { PropTypes, Component } from 'react';
import TagsInput from 'react-tagsinput';
import { formatDate } from '~/src/utils/utils';
import { canEditMetadata } from '~/src/state/user/privileges';
import '~/src/assets/style/react-tagsinput.scss';
import './summary-tab.scss';

export default class SummaryTab extends Component {

    static propTypes = {
        activeItem: PropTypes.object.isRequired,
        activeItemEditing: PropTypes.object.isRequired,
        toggleEditMode: PropTypes.func.isRequired,
        updateMetadata: PropTypes.func.isRequired,
        saveMetadata: PropTypes.func.isRequired,
        updateTags: PropTypes.func.isRequired,
        editMode: PropTypes.bool.isRequired,
    };

    handleEditModeToggled = (save) => {
        const { toggleEditMode, saveMetadata } = this.props;
        if (save) {
            saveMetadata();
        }
        toggleEditMode();
    }

    handleMetadataEdited = (metadataIndex, e) => {
        const { updateMetadata } = this.props;
        updateMetadata(metadataIndex, e.target.value);
    }

    handleTagsUpdated = (tags) => {
        const { updateTags } = this.props;
        updateTags(tags);
    }

    renderMetadataRow(metadata, metadataIndex) {
        const { editMode, activeItem } = this.props;
        // TODO: editMode && metadata.isEditable
        const valueChanged = activeItem.metadata_fields[metadataIndex].data !== metadata.data;
        return (
            <tr className='sidebar-tab summary-tab-row' key={metadataIndex}>
                <td className={`summary-tab-label ${valueChanged ? 'modified' : null}`}>{metadata.name}</td>
                <td className='summary-tab-value'>
                    {editMode ? <input value={metadata.data} onChange={e => this.handleMetadataEdited(metadataIndex, e)} />
                    : <div>{metadata.type !== 'date' ? metadata.data : formatDate(metadata.data)}</div>}
                </td>
            </tr>
        );
    }

    renderEditControls() {
        const { editMode } = this.props;
        if (editMode) {
            return (
                <div>
                    <button className='summary-tab-edit' onClick={() => this.handleEditModeToggled(true)}>Save</button>
                    <button className='summary-tab-cancel' onClick={() => this.handleEditModeToggled(false)}>Cancel</button>
                </div>
            );
        }
        return (
            <button className='summary-tab-edit' onClick={() => this.handleEditModeToggled(false)}>Edit</button>
        );
    }

    render() {
        const { activeItem, activeItemEditing, editMode } = this.props;

        return (
            <div className='summary-tab'>
                <table className='summary-tab-table'>
                    <tbody>
                        {editMode ? activeItemEditing.metadata_fields.map((metadata, metadataIndex) => this.renderMetadataRow(metadata, metadataIndex))
                            : activeItem.metadata_fields.map((metadata, metadataIndex) => this.renderMetadataRow(metadata, metadataIndex))}

                    </tbody>
                </table>
                { canEditMetadata ? this.renderEditControls() : null }
                <div className='summary-tab-tags'>
                    <TagsInput value={activeItem.tags} onChange={this.handleTagsUpdated} />
                </div>
            </div>
        );
    }
}
