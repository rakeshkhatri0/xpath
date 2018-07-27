import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import FontAwesomeIcon from '../../common/fontawesome.conf';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: ''
        };
        // check login
        axios.get('member/checkLogin', {params: {request: 'explicit'}}).then(response => {
            this.setState({
                isAdmin: response.data.member.is_admin
            });
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <div className="cx-wrapper wrapper-bg-color">
                <section className="cx-header">
                    <div className="card-header bg-dark text-white mb-0 py-0">
                        <div className="col-sm">

                            {this.state.isAdmin === 0 ? (
                                <ul className="nav nav-pills mb-2 col-sm-12 justify-content-end" id="pills-tab" role="tablist">
                                    <li className="nav-item link-1 ">
                                        <Link to="/" className="nav-link mt-2 btn btn-extra b1 btn-sm btn-block hvr-grow">
                                            <FontAwesomeIcon icon="list-ul"/>
                                            <span className="mr-1" aria-hidden="true"/>
                                            <span>Project list</span>
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="nav nav-pills mb-2 col-sm-12 justify-content-end" id="pills-tab" role="tablist">
                                    <li className="nav-item link-1 ">
                                        <Link to="/" className="nav-link mt-2 btn btn-extra b1 btn-sm btn-block hvr-grow">
                                            <FontAwesomeIcon icon="list-ul"/>
                                            <span className="mr-1" aria-hidden="true"/>
                                            <span>Project list</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item link-2 ml-3">
                                        <Link to="/add" className="nav-link mt-2 btn btn-extra b1 btn-sm btn-block hvr-grow">
                                            <FontAwesomeIcon icon="plus-circle"/>
                                            <span className="mr-1" aria-hidden="true"/>
                                            <span>Add project</span>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Header;