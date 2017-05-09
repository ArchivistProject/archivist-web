import React, { PropTypes, Component } from 'react';
import { Button, FormGroup, Col, Form, ControlLabel,
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
        removeItem: PropTypes.func.isRequired,
        setPopupName: PropTypes.func.isRequired,
        setCanEdit: PropTypes.func.isRequired,
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
        const { postItemType, itemName, fetchItemTypes } = this.props;

        if (itemName !== '' && itemName !== undefined && itemName !== null) {
            postItemType(itemName).then((response) => {
                fetchItemTypes();
            });
        } else {
            alert('Please enter an item name');
        }
    };

    handleFieldNameChange = (e) => {
        const { setFieldName } = this.props;
        const name = e.target.value;
        setFieldName(name);
    };

    addField = () => {
        const { postFieldType, fieldType, fieldName, currentItem, fetchItemTypes } = this.props;

        if (fieldName !== null && fieldName !== undefined && fieldType !== 'blank' && fieldName !== '') {
            postFieldType(fieldName, fieldType, currentItem).then((response) => {
                fetchItemTypes();
            });
        }
    };

    handleItemNameChange = (e) => {
        const { handleItemNameChange } = this.props;
        const name = e.target.value;
        handleItemNameChange(name);
    };

    handleDeleteCategory = () => {
        if (confirm('Delete this category?')) {
            this.deleteItem();
        }
    }

    deleteCurrentField = (e) => {
        const { removeField, currentItem, fetchItemTypes } = this.props;
        const fieldID = e.target.id;

        if (currentItem !== undefined && fieldID !== undefined && fieldID !== null) {
            removeField(currentItem, fieldID).then((response) => {
                fetchItemTypes();
            });
        }
    };

    deleteItem = () => {
        const { removeItem, currentItem, fetchItemTypes } = this.props;
        removeItem(currentItem).then((response) => {
            fetchItemTypes();
        });
    };

    close = () => {
        const { setFieldVisible } = this.props;
        setFieldVisible(false);
    };

    generateFieldsContent = () => {
        const { groups, currentItem, popupName, canEdit, fieldName, metadataTypes } = this.props;

        return (
            <div>
                <div className='meta-data-container'>
                    <p className='meta-label'>{popupName} Meta Data:</p>
                    {canEdit === false ? <p>Default group cannot be edited</p> : <p>Add a new meta data field to this category below</p>
                    }
                </div>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={3} componentClass={ControlLabel}>All Fields:</Col>
                        <Col sm={5}>
                            <ul className='list-group'>
                                {groups.filter(x => x.id === currentItem)[0].fields.map(obj =>
                                    <li className='list-group-item clearfix'>
                                        {obj.name}
                                        {popupName !== 'Website' && popupName !== 'Generic' ?
                                            <span className='pull-right button-group'>
                                                <Label className='type-label-padding'>{obj.type}</Label>
                                                <Button
                                                    bsSize='xsmall'
                                                    id={obj.id} type='button' onClick={this.deleteCurrentField}
                                                    className='btn'
                                                ><span className='glyphicon glyphicon-remove' /></Button>
                                            </span> : <Label className='type-label'>{obj.type}</Label> }
                                    </li>
                                )}
                            </ul>
                        </Col>
                    </FormGroup>

                    {canEdit === true ?
                        <FormGroup>
                            <Col sm={5}>
                                <input className='text-input-field-name' placeholder='Enter field name' value={fieldName} type='text' onChange={this.handleFieldNameChange} />
                            </Col>

                            <Col sm={2} componentClass={ControlLabel}>Field Type</Col>
                            <Col sm={3}>
                                <select
                                    type='select' placeholder='select'
                                    onChange={this.onFieldTypeDropDown}
                                >
                                    <option value='blank'>Select type...</option>
                                    {metadataTypes.map(type =>
                                        <option value={type}>{type}</option>
                                    )}
                                </select>
                            </Col>

                            <Col sm={2}>
                                <button type='button' className='settings-btn' onClick={this.addField}>Add</button>
                            </Col>
                        </FormGroup> : null }

                    {canEdit === true ?
                        <div className='meta-data-container'>
                            <br />
                            <button type='danger' onClick={this.handleDeleteCategory}>Delete {popupName}</button>
                            <br />
                            <br />
                        </div> : null }
                </Form>
            </div>

        );
    };


    render() {
        const { fieldVisible, groups, itemName } = this.props;
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId='formControlsSelect'>
                        <Col sm={3} componentClass={ControlLabel}>All Categories:</Col>
                        <Col sm={5}>
                            <ListGroup>
                                {groups.map((op, key) =>
                                    <ListGroupItem
                                        onClick={this.handleOnItemSelect}
                                        value={op.id}
                                        key={key}
                                    >
                                        {op.name}
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId='formHorizontalEmail'>
                        <Col sm={8}>
                            <input className='text-input-category' placeholder='Enter category name' value={itemName} type='text' onChange={this.handleItemNameChange} />
                        </Col>
                        <Col sm={4}>
                            <button className='settings-btn' type='button' onClick={() => this.addItem()}>Add</button>
                        </Col>
                    </FormGroup>

                    <div>
                        {fieldVisible ? this.generateFieldsContent() : null}
                    </div>
                </Form>
            </div>
        );
    }
}
