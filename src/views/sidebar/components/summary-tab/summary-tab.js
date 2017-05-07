import React, { PropTypes, Component } from 'react';
import TagsInput from 'react-tagsinput';
import DescriptionBox from '~/src/components/description-box/description-box';
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
        saveTags: PropTypes.func.isRequired,
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
        const { saveTags } = this.props;
        saveTags(tags);
    }

    renderMetadataValue(metadata) {
        switch (metadata.type) {
            case 'true/false': {
                return metadata.data === '1' ? 'true' : 'false';
            }
            case 'date': {
                return formatDate(metadata.data);
            }
            default: {
                return (metadata.data);
            }
        }
    }

    renderSelectOption(selectedValue, metadataIndex, optionArray) {
        return (
            <select className='summary-tab-input' value={selectedValue} onChange={e => this.handleMetadataEdited(metadataIndex, e)}>
                {optionArray.map(option => <option value={option.value}>{option.label}</option>)}
            </select>
        );
    }

    renderMetadataEditRow(metadata, metadataIndex) {
        switch (metadata.type) {
            case 'true/false': {
                const optionArray = [
                    { label: 'false', value: 0 },
                    { label: 'true', value: 1 },
                ];

                return this.renderSelectOption(metadata.data, metadataIndex, optionArray);
            }
            case 'date': {
                return <input className='summary-tab-input' type='date' value={metadata.data} onChange={e => this.handleMetadataEdited(metadataIndex, e)} />;
            }
            default: {
                return <input className='summary-tab-input' value={metadata.data} onChange={e => this.handleMetadataEdited(metadataIndex, e)} />;
            }
        }
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
                        {metadataEditMode ? this.renderMetadataEditRow(metadata, metadataIndex)
                        : this.renderMetadataRow(metadata)}
                    </td>
                </tr>
            );
        });
    }

    renderMetadataRow(metadata) {
        if (metadata.type === 'url') {
            return (<div className='url-data' title={metadata.data}><a href={metadata.data}>{metadata.data}</a></div>);
        }

        return (<div title={metadata.data}>{this.renderMetadataValue(metadata)}</div>);
    }

    renderEditControls() {
        const { metadataEditMode } = this.props;
        if (metadataEditMode) {
            return (
                <div className='summary-tab-metadata-controls'>
                    <button type='small' onClick={() => this.handleMetadataEditModeToggled(true)}>Save</button>
                    <button type='small' onClick={() => this.handleMetadataEditModeToggled(false)}>Cancel</button>
                </div>
            );
        }
        return (
            <div className='summary-tab-metadata-controls'>
                <button type='small' onClick={() => this.handleMetadataEditModeToggled(false)}>Edit Metadata</button>
            </div>
        );
    }

    render() {
        const { activeItem } = this.props;
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
                <span className='summary-tab-category'>Description</span>
                <DescriptionBox {...this.props} />
            </div>
        );
    }
}
