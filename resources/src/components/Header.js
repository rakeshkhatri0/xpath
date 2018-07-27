import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import FontAwesomeIcon from '../common/fontawesome.conf';
import axios from "axios/index";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: ''
        };
        // check login
        axios.get('member/checkLogin').then(response => {
            console.log(response);
            this.setState({
                isAdmin: response.data.member.is_admin
            });
        }).catch(error => {
            console.log(error.response);
        });
    }

    render() {
        return (
            <header>
                <section className="cx-navigation">
                    {this.state.isAdmin===1 ? (
                    <nav className="navbar navbar-expand-sm navbar-dark bg-Customgreen mb-3">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Url Finder</a>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span className="navbar-toggler-icon"/></button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav nav-img ml-auto">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/member/dashboard">Dashboard</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/project/index">Project List</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/member/table">User List</NavLink>
                                    </li>
                                    <li className="nav-item d-none d-sm-block dropdown">
                                        <a href="#avatar" className="nav-link dropdown-toggle img-box show" data-toggle="dropdown" aria-expanded="false"><span className="text-white icon-text">User</span></a>
                                        <div className="dropdown-menu w-100">
                                            <NavLink to="/profile" className="dropdown-item"><FontAwesomeIcon icon="user-circle"/>Profile</NavLink>
                                            <NavLink to="member/logout" className="dropdown-item"><FontAwesomeIcon icon="sign-out-alt"/>Logout</NavLink>
                                        </div>
                                    </li>
                                    <li className="nav-item d-sm-none">
                                        < NavLink className="nav-link" to="/profile">Profile</NavLink>
                                    </li>

                                    <li className="nav-item d-sm-none">
                                        < NavLink className="nav-link" to="/member/logout">Logout</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                        ):(
                            <nav className="navbar navbar-expand-sm navbar-dark bg-Customgreen mb-3">
                                <div className="container-fluid">
                                    <a className="navbar-brand" href="#">Url Finder</a>
                                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span className="navbar-toggler-icon"/></button>
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav nav-img ml-auto">
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/member/dashboard">Dashboard</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/project/index">Project List</NavLink>
                                            </li>
                                            <li className="nav-item d-none d-sm-block dropdown">
                                                <a href="#avatar" className="nav-link dropdown-toggle img-box show" data-toggle="dropdown" aria-expanded="false"><span className="text-white icon-text">User</span></a>
                                                <div className="dropdown-menu w-100">
                                                    <NavLink to="/profile" className="dropdown-item"><FontAwesomeIcon icon="user-circle"/>Profile</NavLink>
                                                    <NavLink to="member/logout" className="dropdown-item"><FontAwesomeIcon icon="sign-out-alt"/>Logout</NavLink>
                                                </div>
                                            </li>
                                            <li className="nav-item d-sm-none">
                                                < NavLink className="nav-link" to="/profile">Profile</NavLink>
                                            </li>

                                            <li className="nav-item d-sm-none">
                                                < NavLink className="nav-link" to="/member/logout">Logout</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        )}
                </section>
            </header>
        );
    }
}
export default Header;