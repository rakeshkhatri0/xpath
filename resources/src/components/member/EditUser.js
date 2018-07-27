import React, {Component} from 'react';
import axios from 'axios';
import FontAwesomeIcon from '../../common/fontawesome.conf';


class EditUser extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            first_name: this.first_name.value,
            last_name: this.last_name.value,
            email: this.email.value,
            password: this.password.value,
            reset_token: this.reset_token.value,
            media: this.media.value
        };
        const userId = this.user_id.value;
        axios.post('member/update/' + userId, user).then((response) => {
            if(response.data.status){
                window.location.reload();
            }
            // this.props.history.push('/member/table');
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <section className="cx-modal">
                    <div className="modal modal-margin" id="editMember">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-header-color">
                                    <h5 className="modal-title text-white"><FontAwesomeIcon icon="edit"/>&nbsp; Update
                                    </h5>
                                    <button className="close text-white" data-dismiss="modal">×</button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSubmit} className="py-3">
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="active">First Name:</label>
                                            <input type="text" ref={input => this.first_name = input}  name="first_name" defaultValue={this.props.user !== null ? this.props.user.first_name: ''}   className="form-control form-control-sm" placeholder="Enter First Name"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="active">Last Name:</label>
                                            <input type="text" ref={input => this.last_name = input} name="last_name" defaultValue={this.props.user !== null ? this.props.user.last_name : ''}  className="form-control form-control-sm" placeholder="Enter Last Name"/>
                                        </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="active">User Email:</label>
                                            <input type="email"  name="email" ref={input => this.email = input} defaultValue={this.props.user !== null ? this.props.user.email : ''} className="form-control form-control-sm" placeholder="Enter User Email"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="active">Password:</label>
                                            <input type="password" ref={input => this.password = input} name="password" defaultValue={this.props.user !== null ? this.props.user.password : ''} className="form-control form-control-sm" placeholder="Enter Password"/>
                                        </div>
                                        <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label className="active">Media:</label>
                                            <input type="text" ref={input => this.media = input} name="media" defaultValue={this.props.user !== null ? this.props.user.media : ''} className="form-control form-control-sm" placeholder="Enter Media"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="active">Reset Token:</label>
                                            <input type="text" ref={input => this.reset_token = input} defaultValue={this.props.user !== null ? this.props.user.reset_token : ''} name="reset_token" className="form-control form-control-sm" placeholder="Enter reset token"/>
                                        </div>
                                        </div>
                                        <input ref={input => {
                                            this.user_id = input
                                        }} type="hidden" name="user_id" value={this.props.user !== null ? this.props.user.id : ''}/>
                                        <button type="submit" className="btn btn-sm btn-block btn-addproject waves-effect waves-light">Update User
                                        </button>
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

export default EditUser;