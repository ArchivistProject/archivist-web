import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { ActionBar } from '~/src/views';
import './settings.scss';

export default class Settings extends Component {


    ChangePW() {

        return(
            <div >
                <h1>YOOOO</h1>
            </div>
        );

    }

    Password(){
        return(
            <div>
                <h2>Password</h2>
                <p>Change your account password</p>
                <button onClick={this.ChangePW}>Password</button>
            </div>
        );
    }

    Background() {
        return (
          <div>
              <h2>Background</h2>
              <p>Change your background color</p>
              <button>Change Color</button>
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
                <input type="text" value="ALSKDJFHLADF34O837048" class="field left" readonly></input>
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
