import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {ActionBar} from '~/src/views';
import config from '~/config';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';
import PasswordDialog from '~/src/views/settings/components/password';
import ColorPickerDialog from '~/src/views/settings/components/backgroundColor';
import RefreshAPI from '~/src/views/settings/components/apiToken';
import Statistic from '~/src/views/settings/components/statistic';
import $ from 'jquery';
import './settings.scss';

export default class Settings extends Component {

    static propTypes = {
        showModal: PropTypes.boolean,
        newPassword: PropTypes.string,
        confirmPassword: PropTypes.string,
        newPasswordChange: PropTypes.func.isRequired,
        confirmPasswordChange: PropTypes.func.isRequired,
        openDialog: PropTypes.func.isRequired,
        closeDialog: PropTypes.func.isRequired,


        showColorModal: PropTypes.boolean,
        colorPicked: PropTypes.string,
        openColorDialog: PropTypes.func.isRequired,
        closeColorDialog: PropTypes.func.isRequired,
        background: PropTypes.string,
        handleOnSelectColor: PropTypes.func.isRequired,
        changeBackgroundColor: PropTypes.func.isRequired,

        apiToken: PropTypes.string,
        refreshAPI: PropTypes.func.isRequired,

        storage: PropTypes.number,
        fileCount: PropTypes.number,
        fetchFileStorage: PropTypes.func.isRequired,
    };

    Password() {
        const {showModal, newPassword, confirmPassword, newPasswordChange, confirmPasswordChange, closeDialog, openDialog} = this.props;
        return (
            <div>
                <Panel header="Password" bsStyle="info">
                    <PasswordDialog showModal={showModal}
                                    newPassword={newPassword}
                                    confirmPassword={confirmPassword}
                                    newPasswordChange={newPasswordChange}
                                    confirmPasswordChange={confirmPasswordChange}
                                    openDialog={openDialog}
                                    closeDialog={closeDialog}
                    />
                </Panel>
            </div>
        )
    }

    Background() {
        const {showColorModal, colorPicked, background, closeColorDialog, openColorDialog, handleOnSelectColor, changeBackgroundColor} = this.props;

        return (
            <div>
                <Panel header="Background" bsStyle="info">
                    <p>Change your background color</p>
                    <ColorPickerDialog showColorModal={showColorModal}
                                       colorPicked={colorPicked}
                                       background={background}
                                       closeColorDialog={closeColorDialog}
                                       openColorDialog={openColorDialog}
                                       handleOnSelectColor={handleOnSelectColor}
                                       changeBackgroundColor={changeBackgroundColor}
                    />
                </Panel>
            </div>
        );
    }

    Statistic() {
        const {fetchFileStorage, storage, fileCount} = this.props;
        return (
            <div>
                <Panel header="Statistic" bsStyle="info">
                    <Statistic fetchFileStorage={fetchFileStorage}
                               storage={storage} fileCount={fileCount}/>
                </Panel>
            </div>
        );
    }

    APIToken() {
        const {apiToken, refreshAPI} = this.props;
        return (
            <div>
                <Panel header="API Token" bsStyle="info">
                    <RefreshAPI apiToken={apiToken}
                                refreshAPI={refreshAPI}/>
                </Panel>
            </div>
        );
    }

    ItemTypes() {
        // const {groups} = this.props;
        return (
            <div>
                <Panel header="Item Types" bsStyle="info">
                    <p>Add a new item type then select one from the list to add fields to it.</p>
                    <ItemTypes/>
                </Panel>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1 className="Settings">SETTINGS</h1>

                <div className="aside">
                    <img src="" alt="LOGO" width='304'
                         height="228"/>
                </div>

                <div className="section">
                    {this.Password()}
                    {this.Background()}
                    {this.Statistic()}
                    {this.APIToken()}
                    {this.ItemTypes()}
                </div>
            </div>
        );
    }
}


const ItemTypes = React.createClass({

    getInitialState() {
        return {
            data: {groups: []},
            itemName: '',
            fieldName: '',
            items: [],
            fields: [],
            itemSelected: '',
            contentVisible: false,
            fieldNameSelected: '',
            oneData: {groups: []},
            test: '',
        }
    },

    componentWillMount(){
        let that = this;
        fetch(`${config.backend}/system/groups`)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (data) {
                that.setState({data: data});
            });
    },


    handleChange(e){
        this.setState({itemName: e.target.value});
    },

    handleFieldNameChange(e){
        this.setState({fieldName: e.target.value});
    },

    postItemType(itemName) {
        const items = {
            "group": {
                "name": itemName,
                "fields": []
            }
        };
        $.post(`${config.backend}/system/groups`, items);
    },

    addItem() {
        this.postItemType(this.state.itemName);
    },

    addField() {
        //this.postFieldType();
        this.setState({fields: this.state.fields.concat(this.state.fieldName)});
    },

    //get the value being selected in the dropdown item types
    onDropdownSelected(e){
        this.setState({itemSelected: e.target.value});

        this.setState({contentVisible: false});
        console.log("Selected: " + this.state.itemSelected);
    },

    edit() {
        let that = this;
        let url = `${config.backend}/system/groups/` + this.state.itemSelected;
        console.log("URL: " + url);

        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (d) {
                that.setState({oneData: d});
            });

        this.setState({contentVisible: true});
        this.test();
    },

    handleFieldTypeChange(e) {
        this.setState({fieldType: e.target.value});
        console.log("Field Type:" + this.state.fieldType);
    },

    onFieldNameDropDown(e){
        this.setState({fieldNameSelected: e.target.value});
        console.log("Field Name Selected: " + this.state.fieldNameSelected);
    },


    generateFieldsContent(){
        return (
            <div>
                <br/>
                <br/>
                <ControlLabel>{this.state.itemSelected} Properties:</ControlLabel>
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
                        <FormControl type="text" value={this.state.fieldName} onChange={this.handleFieldNameChange}/>
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
                            {this.state.fields.map((op) =>
                                <option value={op.id}>{op.name}</option>
                            )}
                        </FormControl>
                    </Col>
                    <Col sm={4}>
                        <Button bsStyle="danger">X</Button>
                    </Col>
                </FormGroup>
            </div>
        );
    },

    test(){
        {this.state.oneData.groups.map((op) =>
            op.fields.forEach((field) => {
                    console.log(field.name);
                }
            )
        )}
    },

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Enter Item Name
                        </Col>
                        <Col sm={5}>
                            <FormControl type="text" value={this.state.itemName}
                                         onChange={this.handleChange}/>
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
                                {this.state.data.groups.map((op) =>
                                <option value={op.id}>{op.name}</option>
                            )}
                            </FormControl>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={this.edit}>Edit</Button>
                        </Col>
                    </FormGroup>

                    <div>
                        { this.state.contentVisible ? this.generateFieldsContent() : null }
                    </div>
                </Form>
            </div>
        );
    }
});
