import React, {Component} from 'react';
import axios from 'axios';
import FontAwesomeIcon from '../../common/fontawesome.conf';

class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete(deleteUser) {
        axios.delete('member/delete/' + deleteUser)
            .then(response => {
                console.log(response);
                // this.props.history.push('/member/table');
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error.response);
            })
    }

    render() {
        return (
            <div>
                <section className="cx-modal">
                    <div className="modal modal-margin" id="mydeleteModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-header-color">
                                    <h5 className="modal-title text-white"><FontAwesomeIcon
                                        icon="trash-alt"/>&nbsp; Delete</h5>
                                    <button className="close text-white" data-dismiss="modal">×</button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete ?
                                </div>
                                <div className="modal-footer">
                                    <button className="no-btn btn btn-sm waves-effect waves-light"
                                            data-dismiss="modal">Cancel
                                    </button>
                                    <input ref={input => {
                                        this.user_id = input
                                    }} type="hidden" name="project_id"
                                           value={this.props.user !== null ? this.props.user.id : ''}/>
                                    <button className="yes-btn btn btn-sm btn-danger waves-effect waves-light"
                                            data-dismiss="modal " onClick={this.handleDelete}>Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default DeleteUser;