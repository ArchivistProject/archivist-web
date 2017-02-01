import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {ActionBar} from '~/src/views';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';
//import ItemTypes from '~/src/views/settings/components/itemTypes';
import PasswordDialog from '~/src/views/settings/components/password';
import ColorPickerDialog from '~/src/views/settings/components/backgroundColor';
import RefreshAPI from '~/src/views/settings/components/apiToken';
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


        /**
         fetchItemType: PropTypes.func.isRequired,
         fetchItemTypeFailed: PropTypes.bool,
         groups: PropTypes.arrayOf(PropTypes.object),**/
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
        return (
            <div>
                <Panel header="Statistic" bsStyle="info">

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