import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {ActionBar} from '~/src/views';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';
import {CirclePicker} from 'react-color';
//import ItemTypes from '~/src/views/settings/components/itemTypes';
import PasswordDialog from '~/src/views/settings/components/password';
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

        /**
         fetchItemType: PropTypes.func.isRequired,
         fetchItemTypeFailed: PropTypes.bool,
         groups: PropTypes.arrayOf(PropTypes.object),**/
    };

    /**
     componentWillMount() {
        const { fetchItemType, groups } = this.props;
        fetchItemType();
    }
     **/
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
        // const {groups} = this.props;
        return (
            <div>
                <Panel header="Item Types" bsStyle="info">
                    <p>Add a new item type then select one from the list to add fields to it.</p>
                    <!-- <ItemTypes groups={groups}/> -->
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
                    {this.ItemTypes()}
                </div>
            </div>
        );
    }
}


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
        this.setState({background: this.state.colorPicked});
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


const RefreshAPI = React.createClass({

    getInitialState() {
        return {API: 'alskdjfhlakjdf'};
    },

    refresh(){
        this.setState({API: ''})
    },

    render(){
        return (
            <div>
                <FormControl componentClass="textarea" placeholder="no API available"
                             readonly>{this.state.API}</FormControl>
                <br/>
                <Button bsStyle="info" onClick={this.refresh}>Refresh</Button>
            </div>
        );
    }

});
