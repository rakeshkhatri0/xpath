import React,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideMatchError = this.hideMatchError.bind(this);
        this.state = {
            matchFailed: false,
            failedMsg: 'New and Confirm password doesn\'t match.'
        }
    }

    static get propTypes() {
        return {
            history: PropTypes.object
        };
    }

    hideMatchError(e) {
        e.preventDefault();
        let newPassword = this.new_password.value;
        let confirmPassword = this.confirm_password.value;
        // match new and confirm password.
        if (newPassword !== confirmPassword) {
            this.setState({
                matchFailed: true
            });
        } else {
            this.setState({
                matchFailed: false
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let newPassword = this.new_password.value || '';
        let confirmPassword = this.confirm_password.value || '';
        const Password = {
            old_password: this.old_password.value,
            new_password: newPassword,
            confirm_password: confirmPassword
        };
        console.log(Password);
        let uri = 'member/changePassword';
        axios.post(uri,Password)
            .then(response => {
                console.log(response);
                if(response.data.status === true) {
                    this.props.history.push('/member/login');
                } else {
                    this.setState({
                        matchFailed: true,
                        failedMsg: response.data.msg || response.data.errors.old_password[0] || response.data.errors.new_password[0]
                    });
                }
                console.log(response);
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    render() {
        return (
            <div className="admin-wrapper">
                <section className="changepassword">
                    <div className="card">
                        <div className="card-body card-change-password">
                            <div className="d-flex justify-content-center header-text">
                                Change Password
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className={this.state.matchFailed ? 'alert alert-danger' : 'hide-element'}>{this.state.failedMsg}</div>
                                <div className="md-form">
                                    <input type="password" ref={input=>this.old_password=input} id="password"
                                           className="form-control"/>
                                    <label htmlFor="password" className="text-gap">Old
                                        Password:</label>
                                </div>
                                <div className="md-form">
                                    <input type="password" id="materialFormLoginPasswordEx" ref={input=>this.new_password=input} onChange={this.hideMatchError}
                                           className="form-control"/>
                                    <label htmlFor="materialFormLoginPasswordEx" className="text-gap">New
                                        Password:</label>
                                </div>
                                <div className="md-form">
                                    <input type="password" id="materialFormreLoginPasswordEx" ref={input=>this.confirm_password=input} onChange={this.hideMatchError}
                                           className="form-control"/>
                                    <label htmlFor="materialFormLoginPasswordEx" className="text-gap">Confirm
                                        Password:</label>
                                </div>
                                <button
                                    className="btn btn-block text-center btn-custom all-btn-submit wave-effect waves-light waves-effect waves-light"
                                    type="submit">Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ChangePassword;