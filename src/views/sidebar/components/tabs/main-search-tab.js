import React, { PropTypes, Component } from 'react';
import './main-search-tab.scss';

export default class SummaryTab extends Component {

    static propTypes = {
        fetchItemTypes: PropTypes.func.isRequired,
        itemTypeSelected: PropTypes.func.isRequired,
        metadataRowAdded: PropTypes.func.isRequired,
        metadataRowFieldUpdated: PropTypes.func.isRequired,
        metadataRowValueUpdated: PropTypes.func.isRequired,
        metadataRowDeleted: PropTypes.func.isRequired,
        itemTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
        metadataRows: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedItemType: PropTypes.object,
    };

    componentWillMount() {
        const { fetchItemTypes } = this.props;
        fetchItemTypes();
    }

    handleItemTypeChanged = (e) => {
        const { itemTypeSelected } = this.props;
        itemTypeSelected(e.target.value);
    }

    handleMetadataRowAdded = () => {
        const { metadataRowAdded } = this.props;
        metadataRowAdded();
    }

    handleMetadataFieldUpdated = (e, rowIndex) => {
        const { metadataRowFieldUpdated, itemTypes } = this.props;
        let metadataFields = itemTypes.map(itemType => itemType.fields);
        metadataFields = [].concat(...metadataFields);
        const metadataField = metadataFields.find(field => field.id === e.target.value);
        metadataRowFieldUpdated(rowIndex, metadataField);
    }

    handleMetadataValueUpdated = (e, rowIndex) => {
        const { metadataRowValueUpdated } = this.props;
        metadataRowValueUpdated(rowIndex, e.target.value);
    }

    handleMetadataRowDeleted = (rowIndex) => {
        const { metadataRowDeleted } = this.props;
        metadataRowDeleted(rowIndex);
    }

    renderItemTypeSelect() {
        const { itemTypes, selectedItemType } = this.props;
        return (
            <section className='search-tab-section'>
                <label htmlFor='search-tab-item-types-input'>Item Type</label>
                <select className='search-tab-item-types' value={selectedItemType} onChange={this.handleItemTypeChanged}>
                    <option value='all' default>All</option>
                    {itemTypes.map(itemType => <option value={itemType.id} key={itemType.id}>{itemType.name}</option>)}
                </select>
            </section>
        );
    }

    renderMetadataSelect() {
        const { itemTypes, metadataRows } = this.props;
        return (
            <section className='search-tab-section'>
                <header className='search-tab-header'>Metadata</header>
                {metadataRows.map((metadataRow, rowIndex) =>
                    <div className='search-tab-metadata-row' key={rowIndex}>
                        <select value={metadataRow.field.id} onChange={e => this.handleMetadataFieldUpdated(e, rowIndex)}>
                            <option defaultValue>Select Field...</option>
                            {itemTypes.map(itemType => itemType.fields.map(field => <option value={field.id}>{field.name}</option>))}
                        </select>
                        <input type='text' onChange={e => this.handleMetadataValueUpdated(e, rowIndex)} value={metadataRow.value} />
                        <button onClick={() => this.handleMetadataRowDeleted(rowIndex)}><i className='icon-cross' /></button>
                    </div>
                )}
                <span onClick={this.handleMetadataRowAdded}>+ New Row</span>
            </section>
        );
    }

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
        return (
            <div className='search-tab'>
                {this.renderItemTypeSelect()}
                {this.renderMetadataSelect()}
                {this.renderTagSelect()}
                {this.renderDescriptionInput()}
            </div>
        );
    }
}
