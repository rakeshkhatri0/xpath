import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from '../Header';
import FontAwesomeIcon from '../../common/fontawesome.conf';
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";

class ShowProject extends Component {
    constructor(props) {
        super(props);
        this.searchProject = this.searchProject.bind(this);
        this.handlePager = this.handlePager.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            projects: [],
            currentPage: '',
            prevPageUrl: '',
            firstPageUrl: '',
            lastPageUrl: '',
            nextPageUrl: '',
            nextPage: '',
            to: '',
            total: '',
            prevPage: '',
            pageUrl: 'project/all',
            search: '',
            baseUrl: axios.defaults.baseURL,
            // for single project
            project: null,
            keywords: [],
            // for select value
            eventType: '',
            isAdmin: '',
            statusList: ['New', 'Inprogress', 'Cancelled', 'Complete']
        };

        axios.get('member/checkLogin').then(response => {
            console.log(response);
            console.log(this.state.isAdmin);
            this.setState({
                isAdmin: response.data.member.is_admin
            });

        }).catch(error=> {
            console.log(error.response);
        });

    }

    handleChange(projectId, e) {
        let params = {
            status: e.target.value
        };
        // make selected
        e.target.setAttribute('selected', 'selected');
        axios.post('project/updateStatus/' + projectId, params)
            .then(response => {
                console.log(response);
            }).catch(function (error) {
        });
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


    handlePager(e) {
        e.preventDefault();
        this.setState({pageUrl: e.target.href}, () => {
            this.searchProject('');
        });

    }


    searchProject(pageUrl) {
        let params = {
            keyword: this.search.value
        };
        let $this = this;
        // remote url
        let remoteUrl = (this.state.pageUrl === null) ? 'project/all' : this.state.pageUrl;
        axios.get(remoteUrl, {params: params})
            .then(response => {
                $this.setState({
                    projects: response.data.data,
                    firstPageUrl: response.data.first_page_url,
                    lastPageUrl: response.data.last_page_url,
                    currentPage: response.data.current_page,
                    nextPageUrl: response.data.next_page_url,
                    prevPageUrl: response.data.prev_page_url,
                    nextPage: response.data.current_page + 1,
                    prevPage: response.data.current_page - 1,
                    total: response.data.total,
                    to: response.data.to,
                });
            }).catch(error => {
            console.log(error.response)
        });
    }

    componentDidMount() {
        this.searchProject(null);
    }

    getProject(projectId) {
        axios.get('project/show/' + projectId).then(response => {
            if (response.data.status) {
                this.setState({
                    project: response.data.project,
                    keywords: response.data.keywords,
                });
            }
        }).catch(function (error) {
            console.log(error.response);
        });
    }

    deleteProject(projectId) {
        axios.delete('project/delete/' + projectId)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error.response);
            })
    }

    render() {
        return (
            <div className="cx-wrapper">
                <Header/>
                <section className="cx-breadcrumb">
                    <div className="breadcrumb py-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">Project List</div>
                                <div className="col-sm-4 text-right">
                                    <ol className="breadcrumb breadcrumb-list">
                                        <li className="breadcrumb-item"><Link to="/member/dashboard">Dashboard</Link></li>
                                        <li className="breadcrumb-item active">Project List</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cx-card-header">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-sm-6 ">
                                        {this.state.isAdmin === 1 ?
                                            <section className="add-button">
                                                <div className="mb-2 py-1 mt-1 text-white">
                                                    <Link to="/project/create" data-toggle="modal" data-target="#addProject" className="btn btn-sm btn-addnew text-white waves-effect waves-light"><FontAwesomeIcon icon="plus-circle"/><span className="ml-1"> Project</span></Link>
                                                </div>
                                            </section>
                                            : ''}
                                    </div>
                                    <div className="col-sm-5 ml-auto">
                                        <section className="search-bar">
                                            <div className="input-group mb-2 py-1 mt-2 text-muted">
                                                <input className="form-control search-dialog" type="search" ref={input => this.search = input} onChange={this.searchProject} placeholder="Search by project name" aria-label="Search"/>
                                                <div className="input-group-append ml-0"><span className="input-group-text search-className text-muted" id="basic-addon2"><FontAwesomeIcon icon="search"/></span></div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={this.state.projects.length > 0 ? '' : 'hide-element'}>
                    <section className="cx-Project-table">
                        <div className="container-fluid">
                            <div className="list-group">
                                <div className="list-group-item">
                                    <div className="bg-color">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th className="pl-2"><FontAwesomeIcon icon="star"/></th>
                                                    <th className="w-50 pl-2">Project Name</th>
                                                    <th className="text-center pl-2"><FontAwesomeIcon icon="arrow-circle-down"/><span className="ml-1">Export</span></th>
                                                    <th className="text-center pl-2">&nbsp;</th>
                                                    {this.state.isAdmin===1 ?<th className="text-center pl-2"><FontAwesomeIcon icon="edit"/><span className="ml-1">Edit</span></th> :''}
                                                    {this.state.isAdmin===1 ?<th className="text-center pl-2"><FontAwesomeIcon icon="trash"/><span className="ml-1">Delete</span></th>:''}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.projects.map((project, i) => {
                                                        return <tr key={i}>
                                                            <td scope="row" className="pl-2">{project.id}</td>
                                                            <td className="w-50 pl-2">{project.project_name}</td>
                                                            <td className="text-center pl-2"><a target="_blank" href={this.state.baseUrl + "project/export/" + project.id} className="btn btn-sm manage-export text-white waves-effect waves-light">Export</a>
                                                            </td>
                                                            <td><select onChange={(e) => this.handleChange(project.id, e)} className="selectpicker">{this.state.statusList.map((status, index) => {return <option value={status.toUpperCase()} key={index}>{status}</option>})}</select>
                                                            </td>
                                                            {this.state.isAdmin === 1 ? <td className="text-center pl-2"><Link onClick={() => {this.getProject(project.id)}} to={"/project/show/" + project.id} className="btn btn-sm manage-search text-white waves-effect waves-light" data-toggle="modal" data-target="#editProject">Edit</Link></td> : ''}
                                                            {this.state.isAdmin === 1 ? <td className="text-center pl-2"><Link onClick={() => {this.deleteProject(project.id)}} to={"/project/delete/" + project.id} className="btn btn-sm btn-danger  text-white waves-effect waves-light" data-toggle="modal" data-target="#mydeleteModal">Delete</Link></td> : ''}
                                                        </tr>
                                                    }
                                                )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className={this.state.projects.length > 0 ? 'hide-element' : ''}><p align="center" className="mb-0 pb-4">No records to show</p></div>
                <section className="cx-project-pagination">
                    <div className="container-fluid">
                        <div className="list-group">
                            <div className="list-group-item">
                                <nav className="mt-3 pagination-className">
                                    <div className={this.state.projects.length > 0 ? '' : 'hide-element'}>
                                        <ul className="pagination pagination-sm justify-content-end">
                                            <div className={this.state.prevPageUrl === null ? "page-item disabled" : "page-item"}><li className="page-item"><a ref={a => this.previousUrl = a} className="page-link" onClick={this.handlePager} href={this.state.prevPageUrl}>Previous</a></li></div>
                                            <li className="page-item active"><a className="page-link" onClick={this.handlePager} href="#">{this.state.currentPage}<span className="sr-only">(current)</span></a></li>
                                            <li className={this.state.to === this.state.total ? "hide-element" : 'page-item'}><a className="page-link" onClick={this.handlePager} href={this.state.nextPageUrl}>{this.state.nextPage}</a></li>
                                            <div className={this.state.nextPageUrl === null ? "page-item disabled" : "page-item"}><li className="page-item "><a className="page-link" onClick={this.handlePager} href={this.state.nextPageUrl}>Next</a></li>
                                            </div>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                {/*delete project*/}
                <DeleteProject project={this.state.project}/>
                {/*create new project*/}
                <AddProject/>
                {/*edit existing project*/}
                <EditProject project={this.state.project} keywords={this.state.keywords}/>
            </div>
        );
    }
}


export default ShowProject;