import React, { PropTypes, Component } from 'react';
import TagsInput from 'react-tagsinput';
import Select from '~/src/components/select/select';
import Checkbox from '~/src/components/checkbox/checkbox';
import { SEARCH_CONSTANTS } from '~/src/state/search/search-constants';
import { getDifference } from '~/src/utils/utils';
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
        updateMetadataItemType: PropTypes.func.isRequired,
        updateMetadataValue: PropTypes.func.isRequired,

        updateTags: PropTypes.func.isRequired,
        updateDescription: PropTypes.func.isRequired,

        submitSearch: PropTypes.func.isRequired,
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
        addMetadataRow(groupIndex);
    }

    handleMetadataFieldUpdated = (e, rowIndex, groupIndex) => {
        if (e.target.value === 'Select Field') {
            return;
        }
        const { updateMetadataField, itemTypes } = this.props;
        let metadataFields = itemTypes.map(itemType => itemType.fields);
        metadataFields = [].concat(...metadataFields);
        const metadataField = metadataFields.find(field => field.id === e.target.value);
        updateMetadataField(metadataField, rowIndex, groupIndex);
    }

    handleMetadataItemTypeUpdated = (e, rowIndex, groupIndex) => {
        if (e.target.value === 'Select Item Type') {
            return;
        }
        const { updateMetadataItemType } = this.props;
        updateMetadataItemType(e.target.value, rowIndex, groupIndex);
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
                                {group.groupType !== SEARCH_CONSTANTS.DESCRIPTION ?
                                    <Checkbox
                                        checked={group.not}
                                        onClick={() => toggleGroupNot(groupIndex)}
                                        label='not'
                                    />
                                : null}
                                <header className='search-tab-header'>{group.groupType}</header>
                                {group.groupType === SEARCH_CONSTANTS.TAG ?
                                    <Select
                                        value={group.andOr}
                                        onChange={() => toggleGroupAndOr(groupIndex)}
                                        options={[SEARCH_CONSTANTS.AND, SEARCH_CONSTANTS.OR]}
                                    />
                                : null}
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
        const { searchGroups, addItemTypeRow, itemTypes } = this.props;
        const numItemTypes = Object.keys(itemTypes).length;
        const numItemTypesSelected = searchGroups[groupIndex].itemTypes.length;

        const groupItemTypes = searchGroups[groupIndex].itemTypes;
        const itemTypeNames = [...Object.keys(itemTypes).map(index => itemTypes[index].name), 'All'];
        const filteredItemTypes = getDifference(itemTypeNames, groupItemTypes);

        return (
            <section className='search-tab-section'>
                {searchGroups[groupIndex].itemTypes.map((itemType, itemTypeIndex) => this.renderItemTypeSelect(itemType, itemTypeIndex, groupIndex, [...filteredItemTypes, itemType]))}
                {numItemTypesSelected <= numItemTypes ? <a onClick={() => addItemTypeRow(groupIndex, filteredItemTypes)}>+ Add Item Type</a> : null}
            </section>
        );
    }

    renderItemTypeSelect(itemType, itemTypeIndex, groupIndex, filteredItemTypes) {
        const { searchGroups, deleteItemTypeRow, toggleGroupAndOr } = this.props;
        const group = searchGroups[groupIndex];
        const isFirst = itemTypeIndex === 0;
        const isLast = itemTypeIndex === group.itemTypes.length - 1;
        const areMultipleSelected = group.itemTypes.length > 1;

        return (
            <section className='search-tab-item-type-group' key={itemTypeIndex}>
                <div className='search-tab-item-type-wrapper'>
                    <select className='search-tab-item-type' value={itemType} onChange={e => this.handleItemTypeChanged(e, itemTypeIndex, groupIndex)}>
                        {filteredItemTypes.map(type => <option value={type} key={type}>{type}</option>)}
                    </select>
                    {isFirst && areMultipleSelected ? <Select
                        className='search-tab-item-separator'
                        value={group.andOr}
                        onChange={() => toggleGroupAndOr(groupIndex)}
                        options={[SEARCH_CONSTANTS.AND, SEARCH_CONSTANTS.OR]}
                    /> : null}
                    {!isLast && !isFirst ? <div className='search-tab-item-separator'>{group.andOr}</div> : null}
                </div>
                {areMultipleSelected ? <button onClick={() => deleteItemTypeRow(itemTypeIndex, groupIndex)}><i className='icon-cross' /></button> : null}
            </section>
        );
    }

    renderMetadataGroup(groupIndex) {
        const { searchGroups, itemTypes, toggleGroupAndOr } = this.props;
        const { metadataRows } = searchGroups[groupIndex];
        const itemTypeNames = [...Object.keys(itemTypes).map(index => itemTypes[index].name)];
        const itemTypeFields = {};
        for (let i = 0; i < itemTypeNames.length; i += 1) {
            itemTypeFields[itemTypeNames[i]] = itemTypes[i].fields;
        }
        console.log(itemTypeFields);
        return (
            <section className='search-tab-section'>
                {metadataRows.map((metadataRow, rowIndex) =>
                    <div className='search-tab-metadata-row' key={rowIndex}>
                        <div className='search-tab-metadata-input'>
                            <div className='search-tab-metadata-selects'>
                                <select value={metadataRow.itemType} onChange={e => this.handleMetadataItemTypeUpdated(e, rowIndex, groupIndex)}>
                                    <option defaultValue disabled={!!metadataRow.itemType}>Select Item Type</option>
                                    {itemTypeNames.map(itemType => <option value={itemType} key={itemType}>{itemType}</option>)}
                                </select>
                                <select value={metadataRow.field.id} onChange={e => this.handleMetadataFieldUpdated(e, rowIndex, groupIndex)}>
                                    <option defaultValue disabled={!!metadataRow.field.id}>Select Field</option>
                                    {itemTypeFields[metadataRow.itemType] ? itemTypeFields[metadataRow.itemType].map(field => <option value={field.id} key={field.id}>{field.name}</option>) : null}
                                </select>
                            </div>
                            <input type='text' onChange={e => this.handleMetadataValueUpdated(e, rowIndex, groupIndex)} value={metadataRow.value} />
                            {rowIndex === 0 && metadataRows.length > 1 ? <Select
                                className='search-tab-item-separator'
                                value={searchGroups[groupIndex].andOr}
                                onChange={() => toggleGroupAndOr(groupIndex)}
                                options={[SEARCH_CONSTANTS.AND, SEARCH_CONSTANTS.OR]}
                            /> : null}
                            {rowIndex !== 0 && rowIndex !== metadataRows.length - 1 ? <div className='search-tab-item-separator'>{searchGroups[groupIndex].andOr}</div> : null}
                        </div>
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
        const { addSearchGroup, submitSearch } = this.props;
        return (
            <div className='search-tab'>
                <button onClick={submitSearch}>Search</button>
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