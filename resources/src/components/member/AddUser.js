import React, {Component} from 'react';
import axios from 'axios';
import FontAwesomeIcon from '../../common/fontawesome.conf';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const register = {
            first_name: this.first_name.value,
            last_name: this.last_name.value,
            email: this.email.value,
            password: this.password.value,
            reset_token:this.reset_token.value,
            media:this.media.value
        };
        console.log(register);
        let uri = 'member/create';
        axios.post(uri, register)
            .then(response => {
                console.log(response);
                // this.props.history.push('/member/table');
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    render() {
        return (
            <div>
                <section className="cx-modal">
                    <div className="modal modal-margin" id="myaddModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-header-color">
                                    <h5 className="modal-title text-white"><FontAwesomeIcon icon="edit"/>&nbsp; Add</h5>
                                    <button className="close text-white" data-dismiss="modal">×</button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSubmit} className="py-3">
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="active">First Name:</label>
                                            <input type="text" className="form-control form-control-sm" name="first_name" id="first_name" ref={input=>this.first_name=input} placeholder="Enter First Name"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="active">Last Name:</label>
                                            <input type="text" ref={input=>this.last_name=input} id="last_name" name="last_name" className="form-control form-control-sm" placeholder="Enter Last Name"/>
                                        </div>
                                        </div>
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="active">User Email:</label>
                                            <input type="email" className="form-control form-control-sm" id ="email" name="email" ref={input=>this.email=input} placeholder="Enter User Email"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="active">Password:</label>
                                            <input type="password" ref={input=>this.password=input} id="password" name="password" className="form-control form-control-sm" placeholder="Enter Password"/>
                                        </div>
                                        </div>
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="active">Media:</label>
                                            <input type="text" ref={input=>this.media=input} id="media" name="media" className="form-control form-control-sm" placeholder="Enter Media"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="active">Reset Token:</label>
                                            <input type="text" ref={input=>this.reset_token=input} id="reset_token" name="reset_token" className="form-control form-control-sm" placeholder="Enter reset token"/>
                                        </div>
                                        </div>
                                        <button type="submit" className="btn btn-sm btn-block btn-addproject waves-effect waves-light">Add User</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default AddUser;