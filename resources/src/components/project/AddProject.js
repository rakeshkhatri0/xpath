import React, {Component} from 'react';
import '../../common/vendor';
import axios from 'axios';
import FontAwesomeIcon from '../../common/fontawesome.conf';

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            formFailed: false,
            errors: [],
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            formFailed: false
        });
        const projectData = {
            project_name: this.project_name.value,
            keywords: this.keywords.value,
            version:this.version.value
        };
        //console.log(projectData);
        axios.post('project/create', projectData)
            .then(response => {
                console.log(response);
                if (response.data.status === true) {
                    /*// close bootstrap modal
                    $('#addProject').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    // reload data
                    this.props.reloadList();*/
                    window.location.reload();
                }
                else if (response.data.status === false) {
                    console.log(response.data.errors);
                    this.setState({
                        formFailed: true,
                        errors: response.data.errors
                    });
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    render() {
        return (
            <div>
                <section className="cx-modal">
                    <div className="modal modal-margin" id="addProject">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-header-color">
                                    <h5 className="modal-title text-white"><FontAwesomeIcon icon="edit"/>&nbsp; Add</h5>
                                    <button className="close text-white" data-dismiss="modal">×</button>
                                </div>
                                <div className={this.state.formFailed ? 'alert alert-danger' : 'hide-element'}>
                                    <ul>
                                        <li className={this.state.errors.project_name ? '' : 'hide-element'}>{this.state.errors.project_name}</li>
                                        <li className={this.state.errors.version ? '' : 'hide-element'}>{this.state.errors.version}</li>
                                        <li className={this.state.errors.keywords ? '' : 'hide-element'}>{this.state.errors.keywords}</li>
                                    </ul>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSubmit} className="py-3">
                                        <div className="form-group">
                                            <label className="active">Project Name:</label>
                                            <input type="text" ref={input => this.project_name = input}
                                                   id="project_name" className="form-control form-control-sm"
                                                   placeholder="Enter Project Name"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="active">Version:</label>
                                            <input type="text" ref={input => this.version = input}
                                                   id="version" className="form-control form-control-sm"
                                                   placeholder="Enter Version"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="active">Keyword:</label>
                                            <input type="text" ref={input => this.keywords = input} id="keywords"
                                                   className="form-control form-control-sm"
                                                   placeholder="Enter Keyword"/>
                                        </div>
                                        <button type="submit"
                                                className="btn btn-sm btn-block btn-addproject waves-effect waves-light">Add
                                            Project
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

export default AddProject;


