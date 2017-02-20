import React, { PropTypes, Component } from 'react';
import {
     Panel,
} from 'react-bootstrap/lib/';
import PasswordDialog from '~/src/views/settings/components/password';
import ColorPickerDialog from '~/src/views/settings/components/backgroundColor';
import RefreshAPI from '~/src/views/settings/components/apiToken';
import Statistic from '~/src/views/settings/components/statistic';
import ItemTypes from '~/src/views/settings/components/itemTypes';
import Logo from '~/src/assets/images/logo.png';
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
        popupName: PropTypes.string,
        setPopupName: PropTypes.func.isRequired,

    };

    password() {
        const { showModal, newPassword, confirmPassword, newPasswordChange, confirmPasswordChange, closeDialog, openDialog } = this.props;
        return (
            <div>
                <Panel header='Password' bsStyle='info'>
                    <PasswordDialog
                        showModal={showModal}
                        newPassword={newPassword}
                        confirmPassword={confirmPassword}
                        newPasswordChange={newPasswordChange}
                        confirmPasswordChange={confirmPasswordChange}
                        openDialog={openDialog}
                        closeDialog={closeDialog}
                    />
                </Panel>
            </div>
        );
    }

    background() {
        const { showColorModal, colorPicked, background, closeColorDialog, openColorDialog, handleOnSelectColor, changeBackgroundColor } = this.props;

        return (
            <div>
                <Panel header='Background' bsStyle='info'>
                    <p>Change your background color</p>
                    <ColorPickerDialog
                        showColorModal={showColorModal}
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

    statistic() {
        const { fetchFileStorage, storage, fileCount } = this.props;
        return (
            <div>
                <Panel header='Statistic' bsStyle='info'>
                    <Statistic
                        fetchFileStorage={fetchFileStorage}
                        storage={storage} fileCount={fileCount}
                    />
                </Panel>
            </div>
        );
    }

    apiToken() {
        const { apiToken, refreshAPI } = this.props;
        return (
            <div>
                <Panel header='API Token' bsStyle='info'>
                    <RefreshAPI
                        apiToken={apiToken}
                        refreshAPI={refreshAPI}
                    />
                </Panel>
            </div>
        );
    }

    itemTypes() {
        const { groups, postItemType, postFieldType, itemName, currentItem, handleItemNameChange, fetchItemTypes, setActiveItem,
            setFieldVisible, fieldVisible, setFieldName, setFieldType, setFieldID, fieldName, fieldType, fieldID, removeField,
            removeItem, popupName, setPopupName } = this.props;
        return (
            <div>
                <Panel header='Item Category' bsStyle='info'>
                    <p>Add new categories for your file and manage meta data for each category. A category can be used when uploading a file.</p>
                    <ItemTypes
                        groups={groups} postItemType={postItemType} itemName={itemName}
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
                        removeItem={removeItem}
                        popupName={popupName}
                        setPopupName={setPopupName}
                    />
                </Panel>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h1 className='Settings'>SETTINGS</h1>

                <div className='aside'>
                    <img
                        src={Logo} alt='Archivist Logo' width='200'
                        height='164'
                    />

                    <p className='caption'>Version 1.0</p>
                </div>

                <div className='section'>
                    {this.statistic()}
                    {this.itemTypes()}
                    {this.background()}
                    {this.password()}
                    {this.apiToken()}
                </div>
            </div>
        );
    }
}
