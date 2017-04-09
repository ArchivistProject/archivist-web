import React, { PropTypes, Component } from 'react';
import { Button, FormControl, FormGroup, Col, Form, ControlLabel,
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
        const { fetchItemTypes } = this.props;
        fetchItemTypes();
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
        const { groups, currentItem, popupName, canEdit, fieldName } = this.props;

        return (
            <div>
                <hr />
                <h4>{popupName} Meta Data</h4>
                {canEdit === false ? <p>Default group cannot be edited</p> :
                <p>Select a field type, enter the field name, and click Add to create a new meta data field for this
                        category</p>
                }
                <Form horizontal>
                    <FormGroup>
                        <Col sm={3} componentClass={ControlLabel}>All Fields</Col>
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
                                                    className='btn btn-danger'
                                                ><span className='glyphicon glyphicon-remove' /></Button>
                                            </span> : <Label className='type-label'>{obj.type}</Label> }
                                    </li>
                                )}
                            </ul>
                        </Col>
                    </FormGroup>

                    {canEdit === true ?
                        <FormGroup>
                            <Col sm={2} componentClass={ControlLabel}>Field Name</Col>
                            <Col sm={3}>
                                <FormControl value={fieldName} type='text' onChange={this.handleFieldNameChange} />
                            </Col>

                            <Col sm={2} componentClass={ControlLabel}>Field Type</Col>
                            <Col sm={3}>
                                <FormControl
                                    componentClass='select' placeholder='select'
                                    onChange={this.onFieldTypeDropDown}
                                >
                                    <option value='blank'>Select type...</option>
                                    <option value='string'>String</option>
                                    <option value='date'>Date</option>
                                </FormControl>
                            </Col>

                            <Col sm={2}>
                                <Button onClick={this.addField}>Add</Button>
                            </Col>
                        </FormGroup> : null }

                    {canEdit === true ?
                        <Col sm={12}>
                            <br />
                            <Button bsStyle='danger' onClick={this.handleDeleteCategory}>Delete {popupName}</Button>
                        </Col> : null }
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
                        <Col sm={3} componentClass={ControlLabel}>All Categories</Col>
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
                        <Col componentClass={ControlLabel} sm={3}>
                            Category Name
                        </Col>
                        <Col sm={5}>
                            <FormControl value={itemName} type='text' onChange={this.handleItemNameChange} />
                        </Col>
                        <Col sm={4}>
                            <Button onClick={() => this.addItem()}>Add</Button>
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
