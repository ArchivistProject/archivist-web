import React, { PropTypes, Component } from 'react';
import TagsInput from 'react-tagsinput';
import Select from '~/src/components/select/select';
import Checkbox from '~/src/components/checkbox/checkbox';
import { SEARCH_CONSTANTS } from '~/src/state/search/search-constants';
import '~/src/assets/style/react-tagsinput.scss';
import './main-search-tab.scss';

export default class SummaryTab extends Component {

    static propTypes = {
        fetchItemTypes: PropTypes.func.isRequired,
        itemTypes: PropTypes.arrayOf(PropTypes.object).isRequired,

        searchGroups: PropTypes.arrayOf(PropTypes.object),
        addSearchGroup: PropTypes.func.isRequired,
        deleteSearchGroup: PropTypes.func.isRequired,
        toggleGroupAndOr: PropTypes.func.isRequired,
        toggleGroupNot: PropTypes.func.isRequired,

        addItemTypeRow: PropTypes.func.isRequired,
        deleteItemTypeRow: PropTypes.func.isRequired,
        selectItemType: PropTypes.func.isRequired,

        addMetadataRow: PropTypes.func.isRequired,
        deleteMetadataRow: PropTypes.func.isRequired,
        updateMetadataField: PropTypes.func.isRequired,
        updateMetadataValue: PropTypes.func.isRequired,

        updateTags: PropTypes.func.isRequired,
        updateDescription: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { fetchItemTypes } = this.props;
        fetchItemTypes();
    }

    handleItemTypeChanged = (e, itemTypeIndex, groupIndex) => {
        const { selectItemType } = this.props;
        selectItemType(e.target.value, itemTypeIndex, groupIndex);
    }

    handleMetadataRowAdded = (groupIndex) => {
        const { addMetadataRow } = this.props;
        console.log(groupIndex);
        addMetadataRow(groupIndex);
    }

    handleMetadataFieldUpdated = (e, rowIndex, groupIndex) => {
        const { updateMetadataField, itemTypes } = this.props;
        let metadataFields = itemTypes.map(itemType => itemType.fields);
        metadataFields = [].concat(...metadataFields);
        const metadataField = metadataFields.find(field => field.id === e.target.value);
        updateMetadataField(metadataField, rowIndex, groupIndex);
    }

    handleMetadataValueUpdated = (e, rowIndex, groupIndex) => {
        const { updateMetadataValue } = this.props;
        updateMetadataValue(e.target.value, rowIndex, groupIndex);
    }

    handleMetadataRowDeleted = (rowIndex, groupIndex) => {
        const { deleteMetadataRow } = this.props;
        deleteMetadataRow(rowIndex, groupIndex);
    }

    renderGroups() {
        const { searchGroups, toggleGroupAndOr, toggleGroupNot, deleteSearchGroup } = this.props;
        return (
            <div className='search-tab-groups'>
                {searchGroups.map((group, groupIndex) => (
                    <div className='search-tab-group-wrapper' key={groupIndex}>
                        <div className='search-tab-group'>
                            <div className='search-tab-group-toolbar'>
                                <Select
                                    value={group.andOr}
                                    onChange={() => toggleGroupAndOr(groupIndex)}
                                    options={[SEARCH_CONSTANTS.AND, SEARCH_CONSTANTS.OR]}
                                />
                                <header className='search-tab-header'>{group.groupType}</header>
                                <Checkbox
                                    checked={group.not}
                                    onClick={() => toggleGroupNot(groupIndex)}
                                    label='not'
                                />
                                <button onClick={() => deleteSearchGroup(groupIndex)}><i className='icon-cross' /></button>
                            </div>
                            {this.renderGroupComponents(group.groupType, groupIndex)}
                        </div>
                        {groupIndex < searchGroups.length - 1 ? <div className='search-tab-group-separator'>AND</div> : null}
                    </div>
                ))}
            </div>
        );
    }

    renderGroupComponents(groupType, groupIndex) {
        switch (groupType) {
            case SEARCH_CONSTANTS.ITEM_TYPE:
                return this.renderItemTypeGroup(groupIndex);
            case SEARCH_CONSTANTS.METADATA:
                return this.renderMetadataGroup(groupIndex);
            case SEARCH_CONSTANTS.TAG:
                return this.renderTagGroup(groupIndex);
            case SEARCH_CONSTANTS.DESCRIPTION:
                return this.renderDescriptionGroup(groupIndex);
        }
        return null;
    }

    renderItemTypeGroup(groupIndex) {
        const { searchGroups, addItemTypeRow } = this.props;
        return (
            <section className='search-tab-section'>
                {searchGroups[groupIndex].itemTypes.map((itemType, itemTypeIndex) => this.renderItemTypeSelect(itemType, itemTypeIndex, groupIndex))}
                <a onClick={() => addItemTypeRow(groupIndex)}>+ Add Item Type</a>
            </section>
        );
    }

    renderItemTypeSelect(itemType, itemTypeIndex, groupIndex) {
        const { searchGroups, itemTypes, deleteItemTypeRow } = this.props;
        return (
            <section className='item-type-group' key={itemTypeIndex}>
                <select className='search-tab-item-types' value={itemType} onChange={e => this.handleItemTypeChanged(e, itemTypeIndex, groupIndex)}>
                    <option value='all' default>All</option>
                    {itemTypes.map(type => <option value={type.id} key={type.id}>{type.name}</option>)}
                </select>
                {searchGroups[groupIndex].itemTypes.length > 1 ?
                    <button onClick={() => deleteItemTypeRow(itemTypeIndex, groupIndex)}><i className='icon-cross' /></button>
                    : null}
            </section>
        );
    }

    renderMetadataGroup(groupIndex) {
        const { searchGroups, itemTypes } = this.props;
        const { metadataRows } = searchGroups[groupIndex];
        return (
            <section className='search-tab-section'>
                {metadataRows.map((metadataRow, rowIndex) =>
                    <div className='search-tab-metadata-row' key={rowIndex}>
                        <select value={metadataRow.field.id} onChange={e => this.handleMetadataFieldUpdated(e, rowIndex, groupIndex)}>
                            <option defaultValue>Select Field...</option>
                            {itemTypes.map(itemType => itemType.fields.map(field => <option value={field.id}>{field.name}</option>))}
                        </select>
                        <input type='text' onChange={e => this.handleMetadataValueUpdated(e, rowIndex, groupIndex)} value={metadataRow.value} />
                        {searchGroups[groupIndex].metadataRows.length > 1 ?
                            <button onClick={() => this.handleMetadataRowDeleted(rowIndex, groupIndex)}><i className='icon-cross' /></button>
                            : null}
                    </div>
                )}
                <a onClick={() => this.handleMetadataRowAdded(groupIndex)}>+ Add Metadata Field</a>
            </section>
        );
    }

    renderTagGroup(groupIndex) {
        const { searchGroups, updateTags } = this.props;
        return (
            <section className='search-tab-section'>
                <TagsInput
                    value={searchGroups[groupIndex].tags || []}
                    onChange={tags => updateTags(tags, groupIndex)}
                    inputProps={{ placeholder: '' }}
                />
            </section>
        );
    }

    renderDescriptionGroup(groupIndex) {
        const { searchGroups, updateDescription } = this.props;
        return (
            <section className='search-tab-section'>
                <textarea value={searchGroups[groupIndex].description} onChange={e => updateDescription(e.target.value, groupIndex)} />
            </section>
        );
    }

    render() {
        const { addSearchGroup } = this.props;
        return (
            <div className='search-tab'>
                {this.renderGroups()}
                <header className='search-tab-new-header'>Create New Search Group</header>
                <div className='search-tab-new-group'>
                    <button onClick={() => addSearchGroup(SEARCH_CONSTANTS.ITEM_TYPE)}>Item Types</button>
                    <button onClick={() => addSearchGroup(SEARCH_CONSTANTS.METADATA)}>Metadata</button>
                    <button onClick={() => addSearchGroup(SEARCH_CONSTANTS.TAG)}>Tags</button>
                    <button onClick={() => addSearchGroup(SEARCH_CONSTANTS.DESCRIPTION)}>Description</button>
                </div>
            </div>
        );
    }
}
