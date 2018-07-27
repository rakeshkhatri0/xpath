import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

class Add extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            projects: [],
            formFailed: false,
            errors: []
        };
    }

    static get propTypes() {
        return {
            history: PropTypes.object
        };
    }

    //submit the new project
    handleSubmit(e) {
        e.preventDefault();
        const projectData = {
            project_name: this.project_name.value,
            keywords: this.keywords.value,
            version:this.project_version.value
        };
        axios.post('project/create', projectData).then(response => {
            console.log(response);
            if (response.data.status === true) {
                this.props.history.push('/');
            }
            else if (response.data.status === false) {
                this.setState({
                    formFailed: true,
                    errors: response.data.errors
                });
            }
        })
    }

    render() {
        return (
            <div className="cx-wrapper wrapper-bg-color">
                <div className={this.state.formFailed ? 'alert alert-danger' : 'hide-element'}>
                    <ul>
                        <li className={this.state.errors.project_name ? '' : 'hide-element'}>{this.state.errors.project_name}</li>
                        <li className={this.state.errors.keywords ? '' : 'hide-element'}>{this.state.errors.keywords}</li>
                    </ul>
                </div>
                <section className="cx-addproject bg-color">
                    <div className="container-fluid">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Project Name:</label>
                                    <input ref={input => this.project_name = input} type="text" className="form-control form-control-sm"/>
                                </div>

                                <div className="form-group">
                                    <label>Keywords:</label>
                                    <textarea ref={textarea => this.keywords = textarea} className="form-control form-control-sm"/>
                                </div>

                                <div className="form-group">
                                    <label>Project Version:</label>
                                    <input ref={input => this.project_version = input} type="text" className="form-control form-control-sm"/>
                                </div>
                                <button type="submit" className="btn btn-sm btn-block manage-project">Add Project</button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

export default Add;