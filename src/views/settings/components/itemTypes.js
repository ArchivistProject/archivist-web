import React, { PropTypes, Component } from 'react';
import { Button, FormControl, FormGroup, Col, Form, ControlLabel,
    ListGroup, ListGroupItem,
} from 'react-bootstrap/lib/';
import './settings.scss';

export default class ItemTypes extends Component {

    static propTypes = {
        groups: PropTypes.arrayOf(Object),
        itemName: PropTypes.string,
        currentItem: PropTypes.string,
        fieldVisible: PropTypes.boolean,
        fieldType: PropTypes.string,
        fieldName: PropTypes.string,
        popupName: PropTypes.string,

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
    };

    componentWillMount() {
        const { fetchItemTypes } = this.props;
        fetchItemTypes();
    }

    onFieldTypeDropDown = (e) => {
        const { setFieldType } = this.props;
        const type = e.target.value;
        console.log(`Field Type Selected: ${type}`);
        setFieldType(type);
    };

    handleOnItemSelect = (item) => {
        const { groups, setActiveItem, setFieldVisible, setPopupName } = this.props;

        const itemID = item.target.value;
        console.log(itemID);
        setActiveItem(itemID);
        setFieldVisible(true);

        // get the group name
        let name = null;
        for (let i = 0; i < groups.length; i += 1) {
            if (groups[i].id === itemID) {
                name = groups[i].name;
            }
        }

        setPopupName(name);
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
        console.log(`Field type: ${fieldType}`);
        console.log(`Field name: ${fieldName}`);
        console.log(`Field id: ${currentItem}`);

        if (fieldName !== null && fieldName !== undefined && fieldType !== 'blank') {
            postFieldType(fieldName, fieldType, currentItem).then((response) => {
                fetchItemTypes();
            });
        } else {
            console.log('Empty field name...');
        }
    };

    handleItemNameChange = (e) => {
        const { handleItemNameChange } = this.props;
        const name = e.target.value;
        handleItemNameChange(name);
    };
    deleteCurrentField = (e) => {
        const { removeField, currentItem, fetchItemTypes } = this.props;

        const fieldID = e.target.id;

        console.log(`Delete field ID: ${fieldID}`);
        console.log(`delete item ID: ${currentItem}`);

        if (currentItem !== undefined && fieldID !== undefined && fieldID !== null) {
            removeField(currentItem, fieldID).then((response) => {
                fetchItemTypes();
            });
        } else {
            console.log('empty field id...');
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
        const { groups, currentItem, popupName } = this.props;

        return (
            <div>
                <hr />
                <h4>{popupName} Meta Data</h4>
                <p>Select a field type, enter the field name, and click Add to create a new meta data field for this cateogry</p>
                <br />
                <Form horizontal>
                    <FormGroup>
                        <Col sm={3} componentClass={ControlLabel}>Field Type</Col>
                        <Col sm={5}>
                            <FormControl
                                componentClass='select' placeholder='select'
                                onChange={this.onFieldTypeDropDown}
                            >
                                <option value='blank'>Select a field type...</option>
                                <option value='string'>String</option>
                                <option value='date'>Date</option>
                            </FormControl>
                        </Col>
                        <Col sm={4} />
                    </FormGroup>

                    <FormGroup>
                        <Col sm={3} componentClass={ControlLabel}>Field Name</Col>
                        <Col sm={5}>
                            <FormControl type='text' onChange={this.handleFieldNameChange} />
                        </Col>
                        <Col sm={4}>
                            <Button onClick={this.addField}>Add</Button>
                        </Col>
                    </FormGroup>

                    <Col sm={3} componentClass={ControlLabel}>All Fields</Col>

                    <Col sm={5}>
                        <ul className='list-group'>
                            {groups.filter(x => x.id === currentItem)[0].fields.map(obj =>
                                <li className='list-group-item clearfix'>
                                    {obj.name}
                                    <span className='pull-right button-group'>
                                        <button
                                            id={obj.id} type='button' onClick={this.deleteCurrentField}
                                            className='btn btn-danger'
                                        ><span className='glyphicon glyphicon-remove' /></button>
                                    </span>
                                </li>
                            )}
                        </ul>
                    </Col>
                    <br />
                    <br />
                    <br />
                    <Col sm={12}>
                        <Button bsStyle='danger' onClick={() => { if (confirm('Delete this category?')) { this.deleteItem(); } }}>Delete {popupName}</Button>
                    </Col>
                </Form>
            </div>

        );
    };


    render() {
        const { fieldVisible, groups, itemName } = this.props;
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId='formHorizontalEmail'>
                        <Col componentClass={ControlLabel} sm={3}>
                            Enter Category Name
                        </Col>
                        <Col sm={5}>
                            <FormControl value={itemName} type='text' onChange={this.handleItemNameChange} />
                        </Col>
                        <Col sm={4}>
                            <Button onClick={() => this.addItem()}>Add</Button>
                        </Col>
                    </FormGroup>


                    <FormGroup controlId='formControlsSelect'>
                        <Col sm={3} componentClass={ControlLabel}>All Categories</Col>
                        <Col sm={5}>
                            <ListGroup>
                                {groups.map(op =>
                                    <ListGroupItem
                                        onClick={this.handleOnItemSelect}
                                        value={op.id}
                                    >{op.name}</ListGroupItem>
                                )}
                            </ListGroup>
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
