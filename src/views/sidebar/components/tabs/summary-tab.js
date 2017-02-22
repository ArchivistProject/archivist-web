import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import * as itemActionCreators from '~/src/state/item/item-action-creators';
import TagsInput from 'react-tagsinput';
import DescriptionBox from '~/src/components/description-box/description-box'
import { formatDate } from '~/src/utils/utils';
import { canEditMetadata } from '~/src/state/user/privileges';
import '~/src/assets/style/react-tagsinput.scss';
import './summary-tab.scss';

export default class SummaryTab extends Component {

    static propTypes = {
        activeItem: PropTypes.object.isRequired,
        activeItemEditing: PropTypes.object.isRequired,
        toggleMetadataEditMode: PropTypes.func.isRequired,
        toggleDescriptionEditMode: PropTypes.func.isRequired,
        updateMetadata: PropTypes.func.isRequired,
        saveMetadata: PropTypes.func.isRequired,
        updateTags: PropTypes.func.isRequired,
        updateDescription: PropTypes.func.isRequired,
        saveDescription: PropTypes.func.isRequired,
        metadataEditMode: PropTypes.bool.isRequired,
        descriptionEditMode: PropTypes.bool.isRequired,
    };

    handleMetadataEditModeToggled = (save) => {
        const { toggleMetadataEditMode, saveMetadata } = this.props;
        if (save) {
            saveMetadata();
        }
        toggleMetadataEditMode();
    }

    handleMetadataEdited = (metadataIndex, e) => {
        const { updateMetadata } = this.props;
        updateMetadata(metadataIndex, e.target.value);
    }

    handleTagsUpdated = (tags) => {
        const { updateTags } = this.props;
        updateTags(tags);
    }

    renderMetadataRows() {
        const { metadataEditMode, activeItem, activeItemEditing } = this.props;
        const itemToDisplay = metadataEditMode ? activeItemEditing : activeItem;
        // TODO: editMode && metadata.isEditable
        return itemToDisplay.metadata_fields.map((metadata, metadataIndex) => {
            const valueChanged = metadataEditMode && activeItem.metadata_fields[metadataIndex].data !== metadata.data;
            return (
                <tr className='sidebar-tab summary-tab-row' key={metadataIndex}>
                    <td className={`summary-tab-label ${valueChanged ? 'modified' : null}`}>{metadata.name}</td>
                    <td className='summary-tab-value'>
                        {metadataEditMode ? <input value={metadata.data} onChange={e => this.handleMetadataEdited(metadataIndex, e)} />
                        : <div>{metadata.type !== 'date' ? metadata.data : formatDate(metadata.data)}</div>}
                    </td>
                </tr>
            );
        });
    }

    renderEditControls() {
        const { metadataEditMode } = this.props;
        if (metadataEditMode) {
            return (
                <div className='summary-tab-metadata-controls'>
                    <button className='summary-tab-edit' onClick={() => this.handleMetadataEditModeToggled(true)}>SAVE</button>
                    <button className='summary-tab-cancel' onClick={() => this.handleMetadataEditModeToggled(false)}>CANCEL</button>
                </div>
            );
        }
        return (
            <div className='summary-tab-metadata-controls'>
                <button className='summary-tab-edit' onClick={() => this.handleMetadataEditModeToggled(false)}>EDIT METADATA</button>
            </div>
        );
    }

    render() {
        const { activeItem, activeItemEditing, tempDescription, descriptionEditMode, updateDescription, saveDescription, toggleDescriptionEditMode } = this.props;
        const descriptionProps = {
            activeItem,
            activeItemEditing,
            updateDescription,
            saveDescription,
            toggleDescriptionEditMode,
            descriptionEditMode};
        return (
            <div className='summary-tab'>
                <section className='summary-tab-metadata'>
                    <span className='summary-tab-category'>Metadata</span>
                    <table className='summary-tab-table'>
                        <tbody>
                            {this.renderMetadataRows()}
                        </tbody>
                    </table>
                    { canEditMetadata ? this.renderEditControls() : null }
                </section>
                <section className='summary-tab-tags'>
                    <span className='summary-tab-category'>Tags</span>
                    <TagsInput
                        value={activeItem.tags || []}
                        onChange={this.handleTagsUpdated}
                        inputProps={{ placeholder: '' }}
                    />
                </section>
                <DescriptionBox {...descriptionProps}/>
            </div>
        );
    }
}
