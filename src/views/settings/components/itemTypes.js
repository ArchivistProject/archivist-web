/**
 * Created by Dung Mai on 1/31/2017.
 */
import React, { PropTypes, Component } from 'react';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';

export default class ItemTypes extends Component {

    static propTypes = {
        groups: PropTypes.arrayOf(PropTypes.object),
        itemName: PropTypes.string,
        fieldName: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string),
        fields: PropTypes.arrayOf(PropTypes.string),
        itemSelected: PropTypes.string,
        contentVisible: PropTypes.boolean,
        fieldNameSelected: PropTypes.string,
    };

    createAllItemList(){
        //fetch and put all names and ID in "items" array
    }

    handleChange(e){
        this.setState({itemName: e.target.value});
    }

    handleFieldNameChange(e){
        this.setState({fieldName: e.target.value});
    }

    addItem() {
        this.postItemType(this.props.itemName);
        this.setState({items: this.props.items.concat(this.props.itemName)});
    }

    addField() {
        //this.postFieldType();
        this.setState({fields: this.props.fields.concat(this.props.fieldName)});
    }

    //get the value being selected in the dropdown item types
    onDropdownSelected(e){
        this.setState({itemSelected: e.target.value});

        //compare name
        //get the item id from the array with that name

        //do a GET with that specific ID

        //put all the field names and ID in "fields' array

        this.setState({contentVisible: false});
        console.log("Selected: " + this.props.itemSelected);
    }

    edit() {
        this.setState({contentVisible: true});
    }

    handleFieldTypeChange(e) {
        this.setState({fieldType: e.target.value});
        console.log("Field Type:" + this.props.fieldType);
    }

    onFieldNameDropDown(e){
        this.setState({fieldNameSelected: e.target.value});
        console.log("Field Name Selected: " + this.props.fieldNameSelected);
    }

    generateFieldsContent(){
        return (
            <div>
                <br/>
                <br/>
                <ControlLabel>item_name Properties:</ControlLabel>
                <br/>
                <FormGroup>
                    <Col sm={3} componentClass={ControlLabel}>Field Type</Col>
                    <Col sm={5}>
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleFieldTypeChange}>
                            <option value="string">String</option>
                            <option value="date">Date</option>
                        </FormControl>
                    </Col>
                    <Col sm={4}/>
                </FormGroup>

                <FormGroup>
                    <Col sm={3} componentClass={ControlLabel}>Field Name</Col>
                    <Col sm={5}>
                        <FormControl type="text" value={this.props.fieldName} onChange={this.handleFieldNameChange}/>
                    </Col>
                    <Col sm={4}>
                        <Button onClick={this.addField}>Add Field</Button>
                    </Col>
                </FormGroup>

                <br/>
                <FormGroup controlId="formControlsSelect">
                    <Col sm={3} componentClass={ControlLabel}>Current Fields</Col>
                    <Col sm={5}>
                        <FormControl componentClass="select" placeholder="select" onChange={this.onFieldNameDropDown}>
                            {this.props.fields.map((op) =>
                                <option value={op}>{op}</option>
                            )}
                        </FormControl>
                    </Col>
                    <Col sm={4}>
                        <Button bsStyle="danger">X</Button>
                    </Col>
                </FormGroup>
            </div>
        );
    }


    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Enter Item Name
                        </Col>
                        <Col sm={5}>
                            <FormControl type="text" value={this.props.itemName}
                                         onChange={this.handleChange}></FormControl>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={() => this.addItem()}>Add</Button>
                        </Col>
                    </FormGroup>


                    <FormGroup controlId="formControlsSelect">
                        <Col sm={3} componentClass={ControlLabel}>All Item Types</Col>
                        <Col sm={5}>
                            <FormControl onChange={this.onDropdownSelected} componentClass="select"
                                         placeholder="select">
                                {this.props.items.map((op) =>
                                    <option value={op}>{op}</option>
                                )}
                            </FormControl>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={this.edit}>Edit</Button>
                        </Col>
                    </FormGroup>

                    <div>
                        { this.props.contentVisible ? this.generateFieldsContent() : null }
                    </div>
                </Form>
            </div>
        );
    }
}