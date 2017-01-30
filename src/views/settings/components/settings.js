import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {ActionBar} from '~/src/views';
import {Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';
import {CirclePicker} from 'react-color';
import config from '~/config';
import './settings.scss';

export default class Settings extends Component {


    fetchItemType() {
        console.log("fetching...");
        return fetch(`${config.backend}/documents/:id(.:format)`)
            .then(response => response.json(), console.log(response.json))
            .catch((error) => { throw new Error(error); });
    }

    Password() {
        return (
            <div>
                <Panel header="Password" bsStyle="info">
                    <PasswordDialog/>
                </Panel>
            </div>
        )
    }

    Background() {
        return (
            <div>
                <Panel header="Background" bsStyle="info">
                    <p>Change your background color</p>
                    <ColorPickerDialog/>
                </Panel>
            </div>
        );
    }

    Statistic() {
        return (
            <div>
                <Panel header="Statistic" bsStyle="info">
                    <p>Storage Used:</p>
                    <p>Files Uploaded:</p>
                </Panel>
            </div>
        );
    }

    APIToken() {
        return (
            <div>
                <Panel header="API Token" bsStyle="info">
                    <RefreshAPI/>
                </Panel>
            </div>
        );
    }

    ItemTypes() {
        return (
            <div>
                <Panel header="Item Types" bsStyle="info">
                    <p>Click to edit auto generated metadata fields </p>
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
                    <img src="http://www.logospike.com/wp-content/uploads/2015/11/A_Logo_01.gif" alt="LOGO" width='304'
                         height="228"/>
                </div>

                <div className="section">
                    {this.Password()}
                    {this.Background()}
                    {this.Statistic()}
                    {this.APIToken()}
                    {this.fetchItemType()}
                    {this.ItemTypes()}
                </div>
            </div>
        );
    }
}


const PasswordDialog = React.createClass({
    getInitialState() {
        return {
            showModal: false,
            newPassword: '',
            confirmPassword: ''
        };
    },

    handleNewPasswordChange(e){
        this.setState({newPassword: e.target.value});
    },

    handleConfirmPassChange(e){
        this.setState({confirmPassword: e.target.value});
    },

    getValidationState() {
        let newLength = this.state.newPassword.length;
        let confirmLength = this.state.confirmPassword.length;
        let newPass = this.state.newPassword;
        let confirmPass = this.state.confirmPassword;
        if (newLength > 1 && confirmLength > 1 && newPass != confirmPass)
            return 'error';
        else if(newLength > 1 && confirmLength > 1 && newPass == confirmPass)
            return 'success';
    },

    close() {
        this.setState({showModal: false});
    },

    open() {
        this.setState({showModal: true});
    },

    render() {
        return (
            <div>
                <p>Change your account password</p>
                <Button
                    bsStyle="info"
                    onClick={this.open}>
                    Change Password
                </Button>
                <Modal show={this.state.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Your Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formBasicText">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Old Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="password"/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState()}>
                                <Col componentClass={ControlLabel} sm={3}>
                                    New Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="password" value={this.state.newPassword} onChange={this.handleNewPasswordChange}/>
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationState()}>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Retype Password
                                </Col>
                                <Col sm={7}>
                                    <FormControl type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPassChange}/>
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.close}>Save</Button>
                        <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

const ColorPickerDialog = React.createClass({
    getInitialState() {
        return {
            showModal: false,
            colorPicked: '',
            background: '#fff'
        };
    },

    close() {
        this.setState({showModal: false});
    },

    open() {
        this.setState({showModal: true});
    },

    handleChangeComplete (color, event) {
        this.setState({colorPicked: color.hex});
        console.log(this.state.colorPicked);
    },

    changeColor(){
        this.setState({ background: this.state.colorPicked });
        this.close();
    },

    render() {
        return (
            <div>
                <Button
                    bsStyle="info"
                    onClick={this.open}>
                    Change Background
                </Button>

                <Modal show={this.state.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Your Color</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CirclePicker onChangeComplete={this.handleChangeComplete}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.changeColor}>Save</Button>
                        <Button bsStyle="warning" onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});


const ItemType = React.createClass({
    getInitialState(){
        return{array: []};
    },

    render() {
        return(
            <div>
                <Button>NEW</Button>
            </div>
        );
    }
});

const ItemTypes = React.createClass({

    getInitialState() {
        return {itemName: '', items: [],
        magazine:[], webpage:[],
        webPageVisible: false, magazineVisible: false};
    },

    handleChange(e){
        this.setState({itemName: e.target.value});
    },

    addItem() {
        this.setState({items: this.state.items.concat(this.state.itemName)});
    },

    onDropdownSelected(e){
        let val = e.target.value;
        if(val == "Magazine")
        {
            console.log("MAG SELECTED");
            this.setState({webPageVisible: false});
            this.setState({magazineVisible: true});
            this.setState({magazine: this.state.magazine.concat(<div><h3>hello</h3></div>)});
        }
        else if(val == "Webpage")
        {
            this.setState({webPageVisible: true});
            this.setState({magazineVisible: false});
            console.log("WEBPAGE SELECTED");
            this.setState({webpage: this.state.webpage.concat(<div><Button>WEBPAGE</Button></div>)});
        }
    },


    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={3}>
                            Item Name
                        </Col>
                        <Col sm={5}>
                            <FormControl type="text" value={this.state.itemName} onChange={this.handleChange}></FormControl>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={() => this.addItem()}>Add</Button>
                        </Col>
                    </FormGroup>

                        <Col sm={12}>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Select Item Type To Edit</ControlLabel>
                            <FormControl onChange={this.onDropdownSelected} componentClass="select" placeholder="select">
                                {this.state.items.map((op) =>
                                    <option value={op}>{op}</option>
                                )}
                            </FormControl>
                        </FormGroup>
                        </Col>

                    <div>
                        {this.state.magazine.map((op) =>
                            { this.state.magazineVisible ? op : null }
                        )}

                        {this.state.webpage.map((op) =>
                            { this.state.webPageVisible ? op : null }
                        )}

                    </div>


                </Form>
            </div>
        );
    }
});


const RefreshAPI = React.createClass({

    getInitialState() {
        return {API: 'alskdjfhlakjdf'};
    },

    refresh(){
        this.setState({API:''})
    },

    render(){
        return(
          <div>
              <FormControl componentClass="textarea" placeholder="no API available" readonly>{this.state.API}</FormControl>
              <br/>
              <Button bsStyle="info" onClick={this.refresh}>Refresh</Button>
          </div>
        );
    }

});
