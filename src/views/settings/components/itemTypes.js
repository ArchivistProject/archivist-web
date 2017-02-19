/**
 * Created by Dung Mai on 1/31/2017.
 */
import React, {PropTypes, Component} from 'react';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row,
    ListGroup, ListGroupItem
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
        fieldID: PropTypes.string,
        popupName: PropTypes.string,

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
        setPopupName: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const {fetchItemTypes} = this.props;
        fetchItemTypes();
    }

    handleItemNameChange = (e) => {
        const {handleItemNameChange} = this.props;
        let name = e.target.value;
        handleItemNameChange(name);
    }

    addItem = () => {
        const {postItemType, itemName, fetchItemTypes} = this.props;

        if (itemName !== "" && itemName !== undefined && itemName !== null) {
            postItemType(itemName).then(response => {
                fetchItemTypes()
            });
        } else {
            alert("Please enter an item name");
        }
    }

    handleOnItemSelect = (item) => {
        const {groups, setActiveItem, setFieldVisible, setPopupName} = this.props;

        let itemID = item.target.value;
        console.log(itemID);
        setActiveItem(itemID);
        setFieldVisible(true);

        //get the group name
        let name = null;
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].id === itemID) {
                name = groups[i].name;
            }
        }

        setPopupName(name);
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

        if (fieldName !== null && fieldName !== undefined && fieldType !== "blank") {
            postFieldType(fieldName, fieldType, currentItem).then(response => {
                fetchItemTypes()
            });
        } else {
            console.log("Empty field name...");
        }
    }

    onCurrentFieldDropDown = (e) => {
        const {setFieldID} = this.props;
        let id = e.target.value;
        setFieldID(id);
        console.log("Field ID Selected: " + id);
    }

    deleteCurrentField = (e) => {
        const {removeField, currentItem, fetchItemTypes} = this.props;

        let fieldID = e.target.id;

        console.log("Delete field ID: " + fieldID);
        console.log("delete item ID: " + currentItem);

        if (currentItem !== undefined && fieldID !== undefined && fieldID !== null) {
            removeField(currentItem, fieldID).then(response => {
                fetchItemTypes()
            });
        } else {
            console.log("empty field id...");
        }
    }

    deleteItem = () => {
        const {removeItem, currentItem, fetchItemTypes} = this.props;
        removeItem(currentItem).then(response => {
            fetchItemTypes()
        });
    }

    close = () => {
        const {setFieldVisible} = this.props;
        setFieldVisible(false);
    }

    generateFieldsContent = () => {
        const {groups, currentItem, popupName} = this.props;
        console.log("generate field entered...");

        return (
            <div>
                <hr/>
                <Col sm={12}>
                    <p><b>{popupName}</b> Meta Data:</p>
                </Col>
                <Form horizontal>
                    <FormGroup>
                        <Col sm={3} componentClass={ControlLabel}>Field Type</Col>
                        <Col sm={5}>
                            <FormControl componentClass="select" placeholder="select"
                                         onChange={this.onFieldTypeDropDown}>
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
                            <Button onClick={this.addField}>Add</Button>
                        </Col>
                    </FormGroup>

                    <p>

                    <Col sm={8}>
                        <ul className="list-group">
                            {groups.filter(x => x.id === currentItem)[0].fields.map(obj =>
                                    <li className="list-group-item clearfix">
                                        {obj.name}
                                        <span className="pull-right button-group">
                            <button id={obj.id} type="button" onClick={this.deleteCurrentField}
                                    className="btn btn-danger"><span className="glyphicon glyphicon-remove"/></button>
                            </span>
                                    </li>
                            )}
                        </ul>
                    </Col>
                </Form>
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
                            Enter Category Name
                        </Col>
                        <Col sm={5}>
                            <FormControl value={itemName} type="text" onChange={this.handleItemNameChange}/>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={() => this.addItem()}>Add</Button>
                        </Col>
                    </FormGroup>


                    <FormGroup controlId="formControlsSelect">
                        <Col sm={3} componentClass={ControlLabel}>All Categories</Col>
                        <Col sm={5}>
                            <ListGroup>
                                {groups.map((op) =>
                                    <ListGroupItem onClick={this.handleOnItemSelect}
                                                   value={op.id}>{op.name}</ListGroupItem>
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