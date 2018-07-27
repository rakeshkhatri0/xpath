import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';
import FontAwesomeIcon from '../../common/fontawesome.conf';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: axios.defaults.baseURL,
            members: [],
            projects: [],
            isAdmin:'',
            count:[]
        };
        axios.get('member/checkLogin').then(response => {
            console.log(response);
            console.log(this.state.isAdmin);
            this.setState({
                isAdmin: response.data.member.is_admin
            });

        }).catch(error => {
            console.log(error.response);
        });

    }

    componentDidMount() {
        axios.get('project/aggregate').then(response => {
            console.log(response);
            if(response.data.status){
                this.setState({count: response.data });
            }
        })
            .catch(function (error) {
                console.log(error.response);
            });

        axios.all([this.getMembers(), this.getProjects()]).then(axios.spread((members, projects) => {
            this.setState({
                members: members.data.data,
                projects: projects.data.data
            })
        })).catch(error => {
            // console.log(error);
        });

    }

    getMembers() {
        return axios.get('member/all', {
            params: {
                per_page: 5
            }
        });
    }

    getProjects() {
        return axios.get('project/all', {
            params: {
                per_page: 5
            }
        });
    }

    render() {
        return (
            <div className="cx-wrapper">
                <Header/>
                <section className="cx-breadcrumb">
                    <div className="breadcrumb py-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8">
                                    Dashboard
                                </div>
                                <div className="col-sm-4 text-right">
                                    <ol className="breadcrumb breadcrumb-list">
                                        <li className="breadcrumb-item active"><Link to="/member/dashboard">Dashboard</Link></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cx-project-cards mb-5">
                    <div className="container-fluid">
                        <div className="row text-white">
                            <div className="col-sm-12 col-md-4 mb-2">
                                <section className="cardone">
                                    <div className="card card-one">
                                        <div className="d-flex align-items-center ml-5">
                                            <div className="ml-3 icon-font-size icon1-color">
                                                <FontAwesomeIcon icon="edit"/>
                                            </div>
                                            <div className="ml-3">
                                                <div className="card-body d-flex p-0 justify-content-center">
                                                    <h2 className="card-head-title">Project</h2>
                                                </div>
                                                <div className="d-flex number-style justify-content-center">
                                                    <h1 className="cardnumber">{this.state.count.project_count}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="col-sm-12 col-md-4 mb-2">
                                <div className="card card-two">
                                    <div className="d-flex align-items-center ml-5">
                                        <div className="ml-3 text-dark icon-font-size icon2-color">
                                            <FontAwesomeIcon icon="edit"/>
                                        </div>
                                        <div className="ml-3">
                                            <div className="card-body text-muted d-flex p-0 justify-content-center">
                                                <h2 className="card-head-title">Keyword</h2>
                                            </div>
                                            <div className="d-flex text-dark number-style justify-content-center">
                                                <h1 className="cardnumber">{this.state.count.keyword_count}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 mb-2">
                                <div className="card card-three">
                                    <div className="d-flex align-items-center ml-5">
                                        <div className="ml-3 icon-font-size icon3-color">
                                            <FontAwesomeIcon icon="edit"/>
                                        </div>
                                        <div className="ml-3">
                                            <div className="card-body card-head-title d-flex p-0 justify-content-center">
                                                <h2 className="card-head-title">Url</h2>
                                            </div>
                                            <div className="d-flex number-style justify-content-center">
                                                <h1 className="cardnumber">{this.state.count.url_count}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cx-project-tables">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-sm-12 mb-3">
                                <section className="cx-first-table">
                                    <section className="cx-header">
                                        <div className="container-fluid">
                                            <div className="card">
                                                <div className="card-header">
                                                    <span>Latest Projects</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="cx-Project-table">
                                        <div className="container-fluid">
                                            <div className="list-group">
                                                <div className="list-group-item">
                                                    <div className="bg-color">
                                                        <div className="table-responsive">
                                                            <table className="table table-sm table-hover table-striped">
                                                                <thead>
                                                                <tr>
                                                                    <th className="pl-2"><FontAwesomeIcon icon="star"/>
                                                                    </th>
                                                                    <th className="w-50 pl-2">Project Name</th>
                                                                    <th className="pl-2"><FontAwesomeIcon icon="arrow-circle-down"/><span className="ml-1">Export</span></th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {this.state.projects.length > 0 && this.state.projects.map((project, i) => {
                                                                        return <tr key={i}>
                                                                            <td>{project.id}</td>
                                                                            <td>{project.project_name}</td>
                                                                            <td>
                                                                                <a target="_blank" href={this.state.baseUrl + 'project/export/' + project.id} className="btn btn-sm manage-export text-white waves-effect waves-light">Export</a>
                                                                            </td>
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
                                    <section className="cx-project-pagination">
                                        <div className="container-fluid">
                                            <div className="list-group">
                                                <div className="list-group-item">
                                                    <nav className="pagination-className">
                                                        <div className="d-flex justify-content-center">
                                                            <Link to="/project/index" className="btn text-white btn-sm btn-own-color my-2">View All</Link>
                                                        </div>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </section>
                            </div>
                            <div className="col-md-6 mb-3 col-sm-12">
                                <section className="cx-second-table">

                                    <section className="cx-header">
                                        <div className="container-fluid">
                                            <div className="card">
                                                <div className="card-header">
                                                    <span>Latest Members</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="cx-Project-table">
                                        <div className="container-fluid">
                                            <div className="list-group">
                                                <div className="list-group-item">
                                                    <div className="bg-color">
                                                        <div className="table-responsive">
                                                            <table className="table table-sm table-hover table-striped">
                                                                <thead>
                                                                <tr>
                                                                    <th><FontAwesomeIcon icon="star"/>
                                                                    </th>
                                                                    <th className="pl-2">Email</th>
                                                                    <th className="pl-2">First Name</th>
                                                                    <th className="pl-2">Last Name</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {this.state.members.map((member, index) => {
                                                                        return <tr key={index}>
                                                                            <td>{member.id}</td>
                                                                            <td>{member.first_name}</td>
                                                                            <td>{member.last_name}</td>
                                                                            <td>{member.email}</td>
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
                                    <section className="cx-project-pagination">
                                        <div className="container-fluid">
                                            <div className="list-group">
                                                <div className="list-group-item">
                                                    <nav className="pagination-className">
                                                        {this.state.isAdmin===1 ?
                                                        <div className="d-flex justify-content-center">
                                                            <Link to="/member/table" className="btn text-white btn-sm btn-own-color my-2">View All</Link>
                                                        </div>
                                                            :''}
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Dashboard;
