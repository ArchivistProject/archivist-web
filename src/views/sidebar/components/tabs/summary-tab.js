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
        updateDescription: PropTypes.func.isRequired,
        saveDescription: PropTypes.func.isRequired,
        editMode: PropTypes.bool.isRequired,
        tempDescription: PropTypes.string,
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

    handleDescriptionUpdated = (e) => {
        const { updateDescription } = this.props;
        updateDescription(e.target.value);
    }

    handleDescriptionSaved = () => {
        const { saveDescription } = this.props;
        saveDescription();
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
                <div className='summary-tab-metadata-controls'>
                    <button className='summary-tab-edit' onClick={() => this.handleEditModeToggled(true)}>SAVE</button>
                    <button className='summary-tab-cancel' onClick={() => this.handleEditModeToggled(false)}>CANCEL</button>
                </div>
            );
        }
        return (
            <div className='summary-tab-metadata-controls'>
                <button className='summary-tab-edit' onClick={() => this.handleEditModeToggled(false)}>EDIT METADATA</button>
            </div>
        );
    }

    render() {
        const { activeItem, activeItemEditing, tempDescription, editMode } = this.props;
        return (
            <div className='summary-tab'>
                <div className='summary-tab-metadata'>
                    <table className='summary-tab-table'>
                        <tbody>
                            {editMode ? activeItemEditing.metadata_fields.map((metadata, metadataIndex) => this.renderMetadataRow(metadata, metadataIndex))
                                : activeItem.metadata_fields.map((metadata, metadataIndex) => this.renderMetadataRow(metadata, metadataIndex))}

                        </tbody>
                    </table>
                    { canEditMetadata ? this.renderEditControls() : null }
                </div>
                <div className='summary-tab-tags'>
                    <TagsInput value={activeItem.tags || []} onChange={this.handleTagsUpdated} />
                </div>
                <div className='summary-tab-description'>
                    <textarea className='summary-tab-description-input' value={activeItem.description} onChange={this.handleDescriptionUpdated} />
                    <button disabled={activeItem.description === tempDescription} onClick={this.handleDescriptionSaved}>SAVE DESCRIPTION</button>
                </div>
            </div>
        );
    }
}
