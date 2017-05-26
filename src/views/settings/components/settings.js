import React, { PropTypes, Component } from 'react';
import PasswordDialog from '~/src/views/settings/components/password';
import RefreshAPI from '~/src/views/settings/components/apiToken';
import DocumentList from '~/src/views/settings/components/documentList';
import Statistic from '~/src/views/settings/components/statistic';
import ItemTypes from '~/src/views/settings/components/itemTypes';
import Logo from '~/src/assets/images/logo.png';
import './settings.scss';

export default class Settings extends Component {

    static propTypes = {
        showModal: PropTypes.bool,
        newPassword: PropTypes.string,
        confirmPassword: PropTypes.string,
        newPasswordChange: PropTypes.func.isRequired,
        confirmPasswordChange: PropTypes.func.isRequired,
        openDialog: PropTypes.func.isRequired,
        closeDialog: PropTypes.func.isRequired,

        apiToken: PropTypes.string,
        refreshAPI: PropTypes.func.isRequired,

        documentsPerPage: PropTypes.number,
        documentListSettingID: PropTypes.string,
        saveDocumentListSettings: PropTypes.func.isRequired,
        fetchDocumentListSettings: PropTypes.func.isRequired,
        handleDocsPerPageChange: PropTypes.func.isRequired,

        storage: PropTypes.number,
        fileCount: PropTypes.number,
        fetchFileStorage: PropTypes.func.isRequired,

        groups: PropTypes.arrayOf(Object),
        itemName: PropTypes.object,
        currentItem: PropTypes.string,
        handleItemNameChange: PropTypes.func.isRequired,

        fetchMetadataTypes: PropTypes.func.isRequired,
        metadataTypes: PropTypes.arrayOf(String),

        fetchItemTypes: PropTypes.func.isRequired,
        addItem: PropTypes.func.isRequired,
        postItemType: PropTypes.func.isRequired,
        setActiveItem: PropTypes.func.isRequired,
        setFieldVisible: PropTypes.func.isRequired,
        fieldVisible: PropTypes.bool,
        setFieldName: PropTypes.func.isRequired,
        setFieldType: PropTypes.func.isRequired,
        setFieldID: PropTypes.func.isRequired,
        fieldType: PropTypes.string,
        fieldName: PropTypes.string,
        postFieldType: PropTypes.func.isRequired,
        removeField: PropTypes.func.isRequired,
        fieldID: PropTypes.string,
        deleteItem: PropTypes.func.isRequired,
        popupName: PropTypes.string,
        setPopupName: PropTypes.func.isRequired,
        setCanEdit: PropTypes.func.isRequired,
        canEdit: PropTypes.bool,

        errorNotification: PropTypes.func.isRequired,
    };

    password() {
        const { showModal, newPassword, confirmPassword, newPasswordChange, confirmPasswordChange, closeDialog, openDialog } = this.props;
        return (
            <div>
                <PasswordDialog
                    showModal={showModal}
                    newPassword={newPassword}
                    confirmPassword={confirmPassword}
                    newPasswordChange={newPasswordChange}
                    confirmPasswordChange={confirmPasswordChange}
                    openDialog={openDialog}
                    closeDialog={closeDialog}
                />
            </div>

        );
    }

    statistic() {
        const { fetchFileStorage, storage, fileCount } = this.props;
        return (
            <div>
                <Statistic
                    fetchFileStorage={fetchFileStorage}
                    storage={storage}
                    fileCount={fileCount}
                />
            </div>
        );
    }

    apiToken() {
        const { apiToken, refreshAPI } = this.props;
        return (
            <div>
                <RefreshAPI
                    apiToken={apiToken}
                    refreshAPI={refreshAPI}
                />
            </div>

        );
    }

    documentList() {
        const { documentsPerPage, documentListSettingID, saveDocumentListSettings, fetchDocumentListSettings, handleDocsPerPageChange } = this.props;
        return (

            <div>
                <DocumentList
                    documentsPerPage={documentsPerPage}
                    documentListSettingID={documentListSettingID}
                    saveDocumentListSettings={saveDocumentListSettings}
                    fetchDocumentListSettings={fetchDocumentListSettings}
                    handleDocsPerPageChange={handleDocsPerPageChange}
                />
            </div>
        );
    }

    itemTypes() {
        const { groups, postItemType, postFieldType, itemName, currentItem, handleItemNameChange, metadataTypes, fetchMetadataTypes, fetchItemTypes, setActiveItem,
            setFieldVisible, fieldVisible, setFieldName, setFieldType, setFieldID, fieldName, fieldType, fieldID, removeField,
            deleteItem, popupName, setPopupName, setCanEdit, canEdit, errorNotification } = this.props;
        return (
            <div>
                <div>
                    <p className='settings-label'>File Category</p>
                    <p>Add new categories for your file and manage meta data for each category. A category can be used when uploading a file.</p>
                    <ItemTypes
                        groups={groups}
                        postItemType={postItemType}
                        itemName={itemName}
                        currentItem={currentItem}
                        handleItemNameChange={handleItemNameChange}
                        fetchMetadataTypes={fetchMetadataTypes}
                        metadataTypes={metadataTypes}
                        fetchItemTypes={fetchItemTypes}
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
                        deleteItem={deleteItem}
                        popupName={popupName}
                        setPopupName={setPopupName}
                        setCanEdit={setCanEdit}
                        canEdit={canEdit}
                        errorNotification={errorNotification}
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='settings'>
                <p className='settings-title'>Settings</p>
                <div className='settings-wrapper'>
                    <h4>Manage and view your preferences below:</h4>
                    <div className='container'>
                        {this.statistic()}
                    </div>
                    <div className='container'>
                        {this.itemTypes()}
                    </div>
                    <div className='container'>
                        {this.documentList()}
                    </div>
                </div>
            </div>
        );
    }
}
