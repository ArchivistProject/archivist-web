import React, { PropTypes, Component } from 'react';
import Select from '~/src/components/select/select';
import Checkbox from '~/src/components/checkbox/checkbox';
import { SEARCH_CONSTANTS } from '~/src/state/search/search-constants';
import './main-search-tab.scss';

export default class SummaryTab extends Component {

    static propTypes = {
        fetchItemTypes: PropTypes.func.isRequired,
        itemTypes: PropTypes.arrayOf(PropTypes.object).isRequired,

        searchGroups: PropTypes.arrayOf(PropTypes.object),
        // itemTypeGroups: PropTypes.arrayOf(PropTypes.object),
        // metadataGroups: PropTypes.arrayOf(PropTypes.object),
        // tagGroups: PropTypes.arrayOf(PropTypes.object),
        // descriptionGroups: PropTypes.arrayOf(PropTypes.object),

        addSearchGroup: PropTypes.func.isRequired,
        deleteSearchGroup: PropTypes.func.isRequired,
        toggleGroupAndOr: PropTypes.func.isRequired,
        toggleGroupNot: PropTypes.func.isRequired,
        selectItemType: PropTypes.func.isRequired,

        addItemTypeRow: PropTypes.func.isRequired,
        addMetadataRow: PropTypes.func.isRequired,
        updateMetadataField: PropTypes.func.isRequired,
        updateMetadataValue: PropTypes.func.isRequired,
        deleteMetadataRow: PropTypes.func.isRequired,
        // metadataRows: PropTypes.arrayOf(PropTypes.object).isRequired,
        // selectedItemType: PropTypes.object,
    };

    componentWillMount() {
        const { fetchItemTypes } = this.props;
        fetchItemTypes();
    }

    handleItemTypeChanged = (e, itemTypeIndex, groupIndex) => {
        const { selectItemType } = this.props;
        selectItemType(e.target.value, itemTypeIndex, groupIndex);
    }

    handleMetadataRowAdded = () => {
        const { addMetadataRow } = this.props;
        addMetadataRow();
    }

    handleMetadataFieldUpdated = (e, rowIndex) => {
        const { updateMetadataField, itemTypes } = this.props;
        let metadataFields = itemTypes.map(itemType => itemType.fields);
        metadataFields = [].concat(...metadataFields);
        const metadataField = metadataFields.find(field => field.id === e.target.value);
        updateMetadataField(rowIndex, metadataField);
    }

    handleMetadataValueUpdated = (e, rowIndex) => {
        const { updateMetadataValue } = this.props;
        updateMetadataValue(rowIndex, e.target.value);
    }

    handleMetadataRowDeleted = (rowIndex) => {
        const { deleteMetadataRow } = this.props;
        deleteMetadataRow(rowIndex);
    }

    renderGroups() {
        const { searchGroups, toggleGroupAndOr, toggleGroupNot, deleteSearchGroup } = this.props;
        return (
            <div className='search-tab-groups'>
                {searchGroups.map((group, groupIndex) => (
                    <div className='search-tab-group' key={groupIndex}>
                        <div className='search-tab-group-toolbar'>
                            <Select
                                value={group.andOr}
                                onChange={() => toggleGroupAndOr(groupIndex)}
                                options={[SEARCH_CONSTANTS.AND, SEARCH_CONSTANTS.OR]}
                            />
                            <Checkbox
                                checked={group.not}
                                onClick={() => toggleGroupNot(groupIndex)}
                                label='not'
                            />
                            <button onClick={() => deleteSearchGroup(groupIndex)}><i className='icon-cross' /></button>
                        </div>
                        {this.renderGroupComponents(group.groupType, groupIndex)}
                    </div>
                ))}
            </div>
        );
    }

    renderItemTypeGroup(groupIndex) {
        const { searchGroups, addItemTypeRow } = this.props;
        return (
            <section className='search-tab-section'>
                <header className='search-tab-header'>Item Types</header>
                {searchGroups[groupIndex].itemTypes.map((itemType, itemTypeIndex) => this.renderItemTypeSelect(itemType, itemTypeIndex, groupIndex))}
                <a onClick={() => addItemTypeRow(groupIndex)}>+ Add Item Type</a>
            </section>
        );
        // {itemTypeGroups.map((itemTypeGroup, groupIndex) => this.renderItemTypeSelect(itemTypeGroup, groupIndex))}
    }

    renderGroupComponents(groupType, groupIndex) {
        switch (groupType) {
            case SEARCH_CONSTANTS.ITEM_TYPE:
                return this.renderItemTypeGroup(groupIndex);
            // case SEARCH_CONSTANTS.METADATA:
            //     return state.metadataGroups;
            // case SEARCH_CONSTANTS.TAG:
            //     return state.tagGroups;
            // case SEARCH_CONSTANTS.DESCRIPTION:
            //     return state.descriptionGroups;
        }
        return null;
    }

    renderItemTypeSelect(itemType, itemTypeIndex, groupIndex) {
        // const { searchGroups } = this.props;
        const { itemTypes } = this.props;
        // return <div key={itemTypeIndex}>{itemTypeIndex}</div>;
        return (
            <section className='item-type-group' key={itemTypeIndex}>
                <select className='search-tab-item-types' value={itemType} onChange={e => this.handleItemTypeChanged(e, itemTypeIndex, groupIndex)}>
                    <option value='all' default>All</option>
                    {itemTypes.map(type => <option value={type.id} key={type.id}>{type.name}</option>)}
                </select>
            </section>
        );
    }

    // renderMetadataSelect() {
    //     const { itemTypes, metadataRows } = this.props;
    //     return (
    //         <section className='search-tab-section'>
    //             <header className='search-tab-header'>Metadata</header>
    //             {metadataRows.map((metadataRow, rowIndex) =>
    //                 <div className='search-tab-metadata-row' key={rowIndex}>
    //                     <select value={metadataRow.field.id} onChange={e => this.handleMetadataFieldUpdated(e, rowIndex)}>
    //                         <option defaultValue>Select Field...</option>
    //                         {itemTypes.map(itemType => itemType.fields.map(field => <option value={field.id}>{field.name}</option>))}
    //                     </select>
    //                     <input type='text' onChange={e => this.handleMetadataValueUpdated(e, rowIndex)} value={metadataRow.value} />
    //                     <button onClick={() => this.handleMetadataRowDeleted(rowIndex)}><i className='icon-cross' /></button>
    //                 </div>
    //             )}
    //             <span onClick={this.handleMetadataRowAdded}>+ New Row</span>
    //         </section>
    //     );
    // }

    renderTagSelect() {
        return (
            <section className='search-tab-section'>
                <header className='search-tab-header'>Tags</header>
            </section>
        );
    }

    renderDescriptionInput() {
        return (
            <section className='search-tab-section'>
                <header className='search-tab-header'>Description</header>
            </section>
        );
    }

    render() {
        const { addSearchGroup } = this.props;
        return (
            <div className='search-tab'>
                {this.renderGroups()}
                <button onClick={() => addSearchGroup(SEARCH_CONSTANTS.ITEM_TYPE)}>item type</button>
                <button onClick={() => addSearchGroup(SEARCH_CONSTANTS.METADATA)}>metadata</button>
                <button onClick={() => addSearchGroup(SEARCH_CONSTANTS.TAG)}>tag</button>
                <button onClick={() => addSearchGroup(SEARCH_CONSTANTS.DESCRIPTION)}>description</button>
            </div>
        );
    }
    // {this.renderMetadataSelect()}
    // {this.renderTagSelect()}
    // {this.renderDescriptionInput()}
}
