import React, {Component} from 'react';
import axios from 'axios';

class LoginFailed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: axios.defaults.webUrl,
            tabId: null
        };
        // bind the methods
        this.openTab = this.openTab.bind(this);
    }

    // open new tab
    openTab() {
        chrome.tabs.create({
            url: this.state.baseUrl + 'member/login'
        }, (tab) => {
            this.setState({
                tabId: tab.id
            });
        });
    }

    render() {
        return (
            <div className="cx-wrapper wrapper-bg-color">
                <div className="d-flex justify-content-center">
                    <div className="p-3">You must <strong><a onClick={this.openTab} title="Login" className="blue-text">Login</a></strong> to use this app.</div>
                </div>
            </div>
        )
    }
}

export default LoginFailed;