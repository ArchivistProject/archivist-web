import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { ActionBar } from '~/src/views';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Tab from 'react-bootstrap/lib/Tab';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import Row from 'react-bootstrap/lib/Row';
import NavItem from 'react-bootstrap/lib/NavItem';
import './settings.scss';


export default class Settings extends Component {

    Password(){
        return(
            <div>
                <h2>Password</h2>
                <PasswordDialog/>
            </div>
        )
    }

    Background() {
        return (
          <div>
              <h2>Background</h2>
              <p>Select a background color to change</p>
              <Color/>
          </div>
        );
    }

    Statistic() {
        return(
            <div>
                <h2>Statistic</h2>
                <p>Storage Used:</p>
                <p>Files Uploaded:</p>
            </div>
        );
    }

    APIToken() {
        return(
            <div>
                <h2>API Token</h2>
                <input type="text" value="ALSKDJFHLAD34O837048" class="field left" readonly></input>
                <button>Refresh</button>
            </div>
        );
    }

    ItemTypes() {
        return(
            <div>
                <h2>Item Types</h2>
                <p>Item types are metadata fields that you define and these fields will be auto generated for you to fill in when you're uploading a file</p>
                <h4>Item Type Name</h4>
                <button>Add</button>
            </div>
        );
    }

    render() {
        return (
            <div className='settings'>
                <ActionBar
                    backVisible={true}
                    uploadVisible={false}
                    searchVisible={false}
                    settingsVisible={false}
                />
                <h1>SETTINGS</h1>
                {this.Password()}
                {this.Background()}
                {this.Statistic()}
                {this.APIToken()}
                {this.ItemTypes()}
            </div>
        );
    }
}

const PasswordDialog = React.createClass({
    getInitialState() {
        return { showModal: false };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render() {
        return (
            <div>
                <p>Change your account password</p>

                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}>
                    Change Password
                </Button>

                <Modal show={this.state.showModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Your Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <h4>Old Password</h4>
                            <input type="password"/>

                            <h4>New Password</h4>
                            <input type="password"/>

                            <h4>Confirm Password</h4>
                            <input type="password"/>
                        </form>
                      </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Save</Button>
                        <Button onClick={this.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

