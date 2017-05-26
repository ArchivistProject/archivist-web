import React, { PropTypes, Component } from 'react';
import { Button, ControlLabel,
    ListGroup, ListGroupItem, Label,
} from 'react-bootstrap/lib/';
import './settings.scss';

export default class ItemTypes extends Component {

    static propTypes = {
        groups: PropTypes.arrayOf(Object),
        itemName: PropTypes.string,
        currentItem: PropTypes.string,
        fieldVisible: PropTypes.bool,
        fieldType: PropTypes.string,
        fieldName: PropTypes.string,
        popupName: PropTypes.string,
        canEdit: PropTypes.bool,

        setActiveItem: PropTypes.func.isRequired,
        handleItemNameChange: PropTypes.func.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,

        fetchMetadataTypes: PropTypes.func.isRequired,
        metadataTypes: PropTypes.arrayOf(String),

        postItemType: PropTypes.func.isRequired,
        postFieldType: PropTypes.func.isRequired,
        setFieldVisible: PropTypes.func.isRequired,
        setFieldName: PropTypes.func.isRequired,
        setFieldType: PropTypes.func.isRequired,
        removeField: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        setPopupName: PropTypes.func.isRequired,
        setCanEdit: PropTypes.func.isRequired,

        errorNotification: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { fetchItemTypes, fetchMetadataTypes } = this.props;
        fetchItemTypes();
        fetchMetadataTypes();
    }

    onFieldTypeDropDown = (e) => {
        const { setFieldType } = this.props;
        const type = e.target.value;
        setFieldType(type);
    };

    handleOnItemSelect = (item) => {
        const { groups, setActiveItem, setFieldVisible, setPopupName, setCanEdit } = this.props;

        const itemID = item.target.value;
        let canEdit = null;
        setActiveItem(itemID);
        setFieldVisible(true);

        // get the group name
        let name = null;
        for (let i = 0; i < groups.length; i += 1) {
            if (groups[i].id === itemID) {
                name = groups[i].name;
                canEdit = groups[i].can_edit;
            }
        }

        setPopupName(name);
        setCanEdit(canEdit);
    };

    addItem = () => {
        const { postItemType, itemName, errorNotification } = this.props;

        if (itemName !== '' && itemName !== undefined && itemName !== null) {
            postItemType(itemName);
        } else {
            errorNotification('Please enter a non-empty item name');
        }
    };

    handleFieldNameChange = (e) => {
        const { setFieldName } = this.props;
        const name = e.target.value;
        setFieldName(name);
    };

    addField = () => {
        const { postFieldType, fieldType, fieldName, currentItem } = this.props;

        if (fieldName !== null && fieldName !== undefined && fieldType !== 'blank' && fieldName !== '') {
            postFieldType(fieldName, fieldType, currentItem);
        }
    };

    handleItemNameChange = (e) => {
        const { handleItemNameChange } = this.props;
        const name = e.target.value;
        handleItemNameChange(name);
    };

    handleDeleteCategory = () => {
        const { deleteItem, currentItem } = this.props;
        if (confirm('Delete this category?')) {
            deleteItem(currentItem);
        }
    }

    deleteCurrentField = (fieldID) => {
        const { removeField, currentItem } = this.props;
        if (currentItem !== undefined && fieldID !== undefined && fieldID !== null) {
            removeField(currentItem, fieldID);
        }
    };

    close = () => {
        const { setFieldVisible } = this.props;
        setFieldVisible(false);
    };

    generateFieldsContent = () => {
        const { groups, currentItem, popupName, canEdit, fieldName, metadataTypes } = this.props;

        return (
            <div className='item-type-container'>
                <div className='item-type-header'>
                    <span className='meta-label'>{popupName} Metadata:</span>
                    {canEdit === false ? <span>Default groups cannot be edited</span> : <span>{'Edit this category\'s metadata fields below'}</span>}
                </div>
                <div className='item-type-details'>
                    <div className='item-type-fields'>
                        <div>
                            <ul className='list-group'>
                                {groups.filter(x => x.id === currentItem)[0].fields.map(obj =>
                                    <li className='list-group-item clearfix'>
                                        {obj.name}
                                        {popupName !== 'Website' && popupName !== 'Generic' ?
                                            <span className='pull-right button-group'>
                                                <Label className='type-label-padding'>{obj.type}</Label>
                                                <Button
                                                    bsSize='xsmall'
                                                    id={obj.id} type='button' onClick={() => this.deleteCurrentField(obj.id)}
                                                    className={`btn ${obj.id === currentItem ? 'active-item' : null}`}
                                                ><span className='glyphicon glyphicon-remove' /></Button>
                                            </span> : <Label className='type-label'>{obj.type}</Label> }
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {canEdit === true ?
                        <div className='metadata-field-input'>
                            <input
                                className='text-input-field-name'
                                placeholder='Enter field name'
                                value={fieldName}
                                type='text'
                                onChange={this.handleFieldNameChange}
                            />

                            <div>
                                <select
                                    type='select' placeholder='select'
                                    onChange={this.onFieldTypeDropDown}
                                >
                                    <option value='blank'>Select type...</option>
                                    {metadataTypes.map(type =>
                                        <option value={type}>{type}</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <button type='button' className='settings-btn' onClick={this.addField}>Add</button>
                            </div>
                        </div> : null }

                    {canEdit === true ?
                        <button type='danger' onClick={() => this.handleDeleteCategory()}>Delete {popupName}</button>
                        : null }
                </div>
            </div>

        );
    };


    render() {
        const { fieldVisible, groups, itemName, currentItem } = this.props;
        return (
            <div className='item-types'>
                <div className='item-types-list'>
                    <span>All Categories:</span>
                    <div>
                        <ListGroup>
                            {groups.map((op, key) =>
                                <ListGroupItem
                                    onClick={this.handleOnItemSelect}
                                    value={op.id}
                                    key={key}
                                    className={`${op.id === currentItem ? 'active-item' : ''}`}
                                >
                                    {op.name}
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </div>

                    <div className='item-type-input'>
                        <input
                            className='text-input-category'
                            placeholder='Enter category name'
                            value={itemName}
                            type='text'
                            onChange={this.handleItemNameChange}
                        />
                        <div>
                            <button className='settings-btn' type='button' onClick={() => this.addItem()}>Add</button>
                        </div>
                    </div>

                    <div>
                        {fieldVisible ? this.generateFieldsContent() : null}
                    </div>
                </div>
            </div>
        );
    }
}
