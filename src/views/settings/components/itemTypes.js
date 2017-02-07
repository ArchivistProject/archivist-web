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

        handleItemNameChange: PropTypes.func.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,
        addItem: PropTypes.func.isRequired,
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
       const {addItem, itemName} = this.props;
       let name = itemName;
       addItem(name);
    }


    handleFieldNameChange(e){
        this.setState({fieldName: e.target.value});
    }

    addField() {
        //this.postFieldType();
        this.setState({fields: this.props.fields.concat(this.props.fieldName)});
    }

    onDropdownSelected = (e) =>{
        const {setActiveItem} = this.props;
        let itemID = e.target.value;
        setActiveItem(itemID);
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
        const {itemName, groups, allItemNames} = this.props;
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Enter Item Name
                        </Col>
                        <Col sm={5}>
                            <FormControl type="text" value={itemName} onChange={this.handleItemNameChange}/>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={this.addItem()}>Add</Button>
                        </Col>
                    </FormGroup>


                    <FormGroup controlId="formControlsSelect">
                        <Col sm={3} componentClass={ControlLabel}>All Item Types</Col>
                        <Col sm={5}>
                            <FormControl onChange={this.onDropdownSelected} componentClass="select" placeholder="select">
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
                        { this.props.contentVisible ? this.generateFieldsContent() : null }
                    </div>
                </Form>
            </div>
        );
    }
}