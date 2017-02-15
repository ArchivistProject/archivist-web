import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {ActionBar} from '~/src/views';
import {
    Modal, Button, FormControl, Collapse, Well, Jumbotron, Panel, FormGroup, Col, Form, ControlLabel, MenuItem, Row
} from 'react-bootstrap/lib/';
import PasswordDialog from '~/src/views/settings/components/password';
import ColorPickerDialog from '~/src/views/settings/components/backgroundColor';
import RefreshAPI from '~/src/views/settings/components/apiToken';
import Statistic from '~/src/views/settings/components/statistic';
import ItemTypes from '~/src/views/settings/components/itemTypes';
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


        groups: PropTypes.arrayOf(Object),
        itemName: PropTypes.object,
        currentItem: PropTypes.string,

        handleItemNameChange: PropTypes.func.isRequired,
        fetchItemTypes: PropTypes.func.isRequired,
        addItem: PropTypes.func.isRequired,
        postItemType: PropTypes.func.isRequired,
        setActiveItem: PropTypes.func.isRequired,
        setFieldVisible: PropTypes.func.isRequired,
        fieldVisible: PropTypes.boolean,
        setFieldName: PropTypes.func.isRequired,
        setFieldType: PropTypes.func.isRequired,
        setFieldID: PropTypes.func.isRequired,
        fieldType: PropTypes.string,
        fieldName: PropTypes.string,
        postFieldType: PropTypes.func.isRequired,
        removeField: PropTypes.func.isRequired,
        fieldID: PropTypes.string,
        removeItem: PropTypes.func.isRequired,

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
        const {groups, postItemType, postFieldType, itemName, currentItem, handleItemNameChange, fetchItemTypes, setActiveItem,
            setFieldVisible, fieldVisible, setFieldName, setFieldType, setFieldID, fieldName, fieldType, fieldID, removeField, removeItem} = this.props;
        return (
            <div>
                <Panel header="Item Types" bsStyle="info">
                    <p>Add a new item type then select one from the list to add fields to it.</p>
                    <ItemTypes groups={groups} postItemType={postItemType} itemName={itemName}
                    currentItem={currentItem} handleItemNameChange={handleItemNameChange} fetchItemTypes={fetchItemTypes}
                    setActiveItem={setActiveItem}
                    setFieldVisible={setFieldVisible}
                    fieldVisible={fieldVisible}
                    setFieldName={setFieldName}
                    setFieldType={setFieldType}
                    fieldName={fieldName}
                    fieldType={fieldType}
                    setFieldID={setFieldID}
                    postFieldType={postFieldType}
                    removeField={removeField}
                    fieldID={fieldID}
                    removeItem={removeItem}/>
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