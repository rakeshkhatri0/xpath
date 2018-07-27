import React, {Component} from 'react';
import axios from "axios/index";
import {Link} from 'react-router-dom';

class Option extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            baseUrl: axios.defaults.baseURL
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let params = {
            page_size: this.page_size.value
        };
        axios.post(this.state.baseUrl + "/page_size", params).then((response) => {
            console.log(response);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-6 offset-3">
                        <div className="sidenav">
                            <Link to="/setting">Setting</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Option;