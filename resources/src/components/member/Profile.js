import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from '../Header';
import ChangePassword from "./ChangePassword";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
        }
    }
    componentDidMount() {
        let id=this.props.match.params.id;
        console.log(id);
        axios.get('member/show/' + id)
            .then(response => {
                this.setState({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    userId:response.data.id
                });
            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        let id = this.props.match.params.id;
        const data = {
            first_name: this.first_name.value,
            last_name: this.last_name.value,
            email: this.email.value,
        };

        axios.post('member/update/' + id, data)
            .then((response) => {
                this.props.history.push('/member/dashboard');
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return (
            <div>
                {/*NavBar section*/}
                <Header/>
                {/*BreadCrumb section*/}
                <section className="cx-breadcrumb">
                    <div className="breadcrumb py-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">Edit Profile</div>
                                <div className="col-sm-4 text-right">
                                    <ol className="breadcrumb breadcrumb-list">
                                        <li className="breadcrumb-item"><Link to="/member/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item active">Edit Profile</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*profile edit section*/}
                <section className="cx-Project-table">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <section className="editprofile">
                                    <div className="card">
                                        <div className="card-body card-change-profile">
                                            <div className="d-flex justify-content-center header-text">Profile Information</div>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="md-form">
                                                    <input type="text" id="materialFirstnameEx"
                                                           ref={input => this.first_name = input}
                                                           defaultValue={this.state.first_name}
                                                           className="form-control"/><label
                                                    htmlFor="materialFormLoginEmailEx" className="text-gap">First
                                                    Name:</label>
                                                </div>

                                                <div className="md-form">
                                                    <input type="password" id="materialLastnameEx"
                                                           ref={input => this.last_name = input}
                                                           defaultValue={this.state.last_name}
                                                           className="form-control"/><label
                                                    htmlFor="materialFormLoginPasswordEx" className="text-gap">Last
                                                    Name:</label>
                                                </div>
                                                <div className="md-form">
                                                    <input type="password" id="materialEmailEx"
                                                           ref={input => this.email = input}
                                                           defaultValue={this.state.email}
                                                           className="form-control"/><label
                                                    htmlFor="materialFormLoginPasswordEx"
                                                    className="text-gap">Email:</label>
                                                </div>
                                                <button type="submit"
                                                        className="btn btn-custom btn-block waves-effect waves-light">Update
                                                    Information
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                {/*This is changePassword section*/}
                                <ChangePassword/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Profile;