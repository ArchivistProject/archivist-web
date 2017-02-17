/**
 * Created by Dung Mai on 1/31/2017.
 */
import React, { PropTypes, Component } from 'react';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';

export default class ItemTypes extends Component {

    static propTypes = {
        groups: PropTypes.arrayOf(Object),
        itemName: PropTypes.string,
        currentItem: PropTypes.string,
        fieldVisible: PropTypes.boolean,
        fieldType: PropTypes.string,
        fieldName: PropTypes.string,
        fieldID: PropTypes.string,

        setActiveItem: PropTypes.func.isRequired,
        handleItemNameChange: PropTypes.func.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,
        postItemType: PropTypes.func.isRequired,
        postFieldType: PropTypes.func.isRequired,
        setFieldVisible: PropTypes.func.isRequired,
        setFieldName: PropTypes.func.isRequired,
        setFieldType: PropTypes.func.isRequired,
        setFieldID: PropTypes.func.isRequired,
        removeField: PropTypes.func.isRequired,
        removeItem: PropTypes.func.isRequired,
    };

    componentWillMount(){
        const {fetchItemTypes} = this.props;
        fetchItemTypes();
    }

    handleItemNameChange = (e) =>{
        const {handleItemNameChange} = this.props;
        let name = e.target.value;
        handleItemNameChange(name);
    }

    addItem = () => {
       const {postItemType, itemName, fetchItemTypes} = this.props;

       if(itemName !== "" && itemName !== undefined && itemName !== null) {
           postItemType(itemName).then(response => {fetchItemTypes()});
       } else {
           alert("Please enter an item name");
       }
    }

    handleOnItemSelect = (item) => {
       const {setActiveItem, setFieldVisible} = this.props;

        let itemID = item.target.value;
        console.log(itemID);
        setActiveItem(itemID);
        setFieldVisible(false);
    }

    edit = () => {
        const {setFieldVisible, currentItem} = this.props;
        if(currentItem !== "blank")
            setFieldVisible(true);
    }

    onFieldTypeDropDown = (e) => {
        const {setFieldType} = this.props;
        let type = e.target.value;
        console.log("Field Type Selected: " + type);
        setFieldType(type);
    }

    handleFieldNameChange = (e) => {
        const {setFieldName} = this.props;
        let name = e.target.value;
        setFieldName(name);
    }

    addField = () => {
        const {postFieldType, fieldType, fieldName, currentItem, fetchItemTypes} = this.props;
        console.log("Field type: " + fieldType);
        console.log("Field name: " + fieldName);
        console.log("Field id: " + currentItem);

        if(fieldName !== null && fieldName !== undefined && fieldType !== "blank") {
            postFieldType(fieldName, fieldType, currentItem).then(response => {fetchItemTypes()});
        } else {
            console.log("Empty field name...");
        }
    }

    onCurrentFieldDropDown = (e) =>{
        const {setFieldID} = this.props;
        let id = e.target.value;
        setFieldID(id);
        console.log("Field ID Selected: " + id);
    }

    deleteCurrentField = () => {
        const {removeField, fieldID, currentItem, fetchItemTypes} = this.props;

        console.log("Delete field ID: " + fieldID);
        console.log("delete item ID: " + currentItem);

        if(currentItem !== undefined && fieldID !== undefined && fieldID !== null) {
            removeField(currentItem, fieldID).then(response => {fetchItemTypes()});
        } else {
            console.log("empty field id...");
        }
    }

    deleteItem = () => {
        const {removeItem, currentItem, fetchItemTypes} = this.props;
        removeItem(currentItem).then(response => {fetchItemTypes()});
    }

    generateFieldsContent = () => {
        const {groups, currentItem} = this.props;
        return (
            <div>
                <br/>
                <ControlLabel>Item Properties:</ControlLabel>
                <br/>
                <FormGroup>
                    <Col sm={3} componentClass={ControlLabel}>Field Type</Col>
                    <Col sm={5}>
                        <FormControl componentClass="select" placeholder="select" onChange={this.onFieldTypeDropDown}>
                            <option value="blank">Select a field type...</option>
                            <option value="string">String</option>
                            <option value="date">Date</option>
                        </FormControl>
                    </Col>
                    <Col sm={4}/>
                </FormGroup>

                <FormGroup>
                    <Col sm={3} componentClass={ControlLabel}>Field Name</Col>
                    <Col sm={5}>
                        <FormControl type="text" onChange={this.handleFieldNameChange}/>
                    </Col>
                    <Col sm={4}>
                        <Button onClick={this.addField}>Add Field</Button>
                    </Col>
                </FormGroup>

                <br/>
                <FormGroup controlId="formControlsSelect">
                    <Col sm={3} componentClass={ControlLabel}>Current Fields</Col>
                    <Col sm={5}>
                        <FormControl componentClass="select" onChange={this.onCurrentFieldDropDown}>
                            <option value="blank">Select a field...</option>
                            {groups.filter(x => x.id === currentItem)[0].fields.map(obj =>
                                <option value={obj.id}>{obj.name}</option>
                            )}
                        </FormControl>
                    </Col>
                    <Col sm={4}>
                        <Button bsStyle="danger" onClick={this.deleteCurrentField}>X</Button>
                    </Col>
                    <br/>
                    <Col sm={4}>
                        <Button bsStyle="danger" onClick={() => {if(confirm('Are you sure you want to delete this item type?')) {this.deleteItem()}}}>Delete Item</Button>
                    </Col>
                </FormGroup>
            </div>
        );
    }


    render() {
        const {fieldVisible, groups, itemName} = this.props;
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Enter Item Name
                        </Col>
                        <Col sm={5}>
                            <FormControl value={itemName} type="text" onChange={this.handleItemNameChange}/>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={() => this.addItem()}>Add</Button>
                        </Col>
                    </FormGroup>


                    <FormGroup controlId="formControlsSelect">
                        <Col sm={3} componentClass={ControlLabel}>All Item Types</Col>
                        <Col sm={5}>
                            <FormControl onChange={this.handleOnItemSelect} componentClass="select">
                                <option value="blank">Select an item...</option>
                                {groups.map((op) =>
                                    <option value={op.id}>{op.name}</option>
                                )}
                            </FormControl>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={this.edit}>Edit</Button>
                        </Col>
                    </FormGroup>

                    <div>
                        { fieldVisible ? this.generateFieldsContent() : null }
                    </div>
                </Form>
            </div>
        );
    }
}