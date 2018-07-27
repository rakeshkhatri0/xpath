import React, {Component} from 'react';
import axios from 'axios';
import FontAwesomeIcon from '../../common/fontawesome.conf';

class EditProject extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getKeywords(keywords) {
        let items = [];
        if (keywords !== null) {
            keywords.forEach((keyword, index) => {
                items.push(keyword.keyword);
            })
        }
        return items.join(',');
    }

    handleSubmit(e) {
        e.preventDefault();
        const project = {
            keyword: this.keywords.value,
            project_name: this.project_name.value,
            version: this.version.value,
        };
        const projectId = this.project_id.value;

        axios.post('project/update/' + projectId, project).then((response) => {
            window.location.reload();
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <section className="cx-modal">
                <div className="modal modal-margin" id="editProject">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-header-color">
                                <h5 className="modal-title text-white"><FontAwesomeIcon icon="edit"/>&nbsp; Edit </h5>
                                <button className="close text-white" data-dismiss="modal">×</button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit} className="py-3">
                                    <div className="form-group">
                                        <label className="active">Project Name:</label>
                                        <input type="text" ref={input => this.project_name = input} defaultValue={this.props.project !== null ? this.props.project.project_name : ''} onChange={this.handleChange1} className="form-control form-control-sm" placeholder="Enter Project Name"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="active">Version:</label>
                                        <input type="text" ref={input => this.version = input} defaultValue={this.props.project !== null ? this.props.project.version : ''} onChange={this.handleChange1} className="form-control form-control-sm" placeholder="Enter version"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="active">Keyword:</label>
                                        <input type="text" ref={input => this.keywords = input} defaultValue={this.getKeywords(this.props.keywords)} onChange={this.handleChange2} className="form-control form-control-sm" placeholder="Enter Keyword"/>
                                    </div>
                                    <input ref={input => {
                                        this.project_id = input
                                    }} type="hidden" name="project_id" value={this.props.project !== null ? this.props.project.id : ''}/>
                                    <button type="submit" className="btn btn-sm btn-block btn-addproject waves-effect waves-light">Edit Project</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default EditProject;