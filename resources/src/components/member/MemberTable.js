import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import AddUser from './AddUser';
import FontAwesomeIcon from '../../common/fontawesome.conf';
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

class MemberTable extends Component {
    constructor(props) {
        super(props);
        this.searchProject = this.searchProject.bind(this);
        this.handlePager = this.handlePager.bind(this);

        this.state = {
            users: [],
            currentPage: '',
            prevPageUrl: '',
            firstPageUrl: '',
            lastPageUrl: '',
            nextPageUrl: '',
            nextPage: '',
            total:'',
            to:'',
            prevPage: '',
            pageUrl: 'member/all',
            search: '',
            // single user
            user:null
        };
    }
    deleteUser(userId) {
        axios.delete('member/delete/' + userId)
            .then(response => {
                console.log(response);
                // this.props.history.push('/project/index');
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error.response);
            })
    }

    handlePager(e) {
        e.preventDefault();
        this.setState({pageUrl: e.target.href}, () => {
            this.searchProject('');
        });

    }
    componentDidMount() {
        this.searchProject(null);
    }
    searchProject(pageUrl) {
        let params = {
            first_name: this.search.value
        };
        let $this = this;
        // remote url
        let remoteUrl = (this.state.pageUrl === null) ? 'member/all' : this.state.pageUrl;
        axios.get(remoteUrl, {params: params})
            .then(response => {
                $this.setState({
                    users: response.data.data,
                    firstPageUrl: response.data.first_page_url,
                    lastPageUrl: response.data.last_page_url,
                    currentPage: response.data.current_page,
                    nextPageUrl: response.data.next_page_url,
                    prevPageUrl: response.data.prev_page_url,
                    nextPage: response.data.current_page + 1,
                    prevPage: response.data.current_page - 1,
                    total:response.data.total,
                    to:response.data.to
                });
            }).catch(error => {
            console.log(error.response)
        });
    }

    getUser(userId) {
        axios.get('member/show/' + userId).then(response => {
            // console.log(response.data);
                this.setState({
                    user: response.data
                },()=>{
                    console.log('state value');
                    console.log(this.state.user);
                });
        }).catch(function (error) {
            console.log(error.response);
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
                                    User List
                                </div>
                                <div className="col-sm-4 text-right">
                                    <ol className="breadcrumb breadcrumb-list">
                                        <li className="breadcrumb-item"><Link to="/member/dashboard">Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item active">User List
                                        </li>
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
                                        <section className="add-button">
                                            <div className="mb-2 py-1 mt-1 text-white">
                                                <Link to="/member/add" data-toggle="modal" data-target="#myaddModal"
                                                      className="btn btn-sm btn-addnew text-white waves-effect waves-light"><FontAwesomeIcon
                                                    icon="plus-circle"/><span className="ml-1">User</span></Link></div>
                                        </section>
                                    </div>
                                    <div className="col-sm-5 ml-auto">
                                        <section className="search-bar">
                                            <div className="input-group mb-2 py-1 mt-2 text-muted">
                                                <input className="form-control search-dialog" type="search"
                                                       ref={input => this.search = input} onChange={this.searchProject}
                                                       placeholder="Search by name" aria-label="Search"/>
                                                <div className="input-group-append ml-0"><span
                                                    className="input-group-text search-className text-muted"
                                                    id="basic-addon2"><FontAwesomeIcon icon="search"/></span>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={this.state.users.length > 0 ? '' : 'hide-element'}>
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
                                                    <th className="pl-2">First Name</th>
                                                    <th className="pl-2">Last Name</th>
                                                    <th className="pl-2">Email</th>
                                                    <th className="text-center pl-2"><FontAwesomeIcon icon="edit"/><span
                                                        className="ml-1">Edit</span></th>
                                                    <th className="text-center pl-2"><FontAwesomeIcon
                                                        icon="trash"/><span className="ml-1">Delete</span></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.users.map((user, i) => {
                                                        return <tr key={i}>
                                                            <td>{user.id}</td>
                                                            <td>
                                                                {user.first_name}
                                                            </td>
                                                            <td>
                                                                {user.last_name}
                                                            </td>
                                                            <td>
                                                                {user.email}
                                                            </td>

                                                            <td className="text-center pl-2"><Link onClick={() => {
                                                                this.getUser(user.id)
                                                            }} to={"/member/show/" + user.id} data-toggle="modal" data-target="#editMember" className="btn btn-sm manage-search text-white waves-effect waves-light">Edit</Link>
                                                            </td>
                                                            <td className="text-center pl-2"><Link onClick={() => {
                                                                this.deleteUser(user.id)
                                                            }} to={"/member/delete/" + user.id} data-toggle="modal" data-target="#mydeleteModal" className="btn btn-sm btn-danger text-white waves-effect waves-light">Delete</Link>
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
                </div>
                <div className={this.state.users.length > 0 ? 'hide-element' : ''}>
                    <div className="text-center">No record found
                    </div>
                </div>
                <section className="cx-project-pagination">
                    <div className="container-fluid">
                        <div className="list-group">
                            <div className="list-group-item">
                                <nav className="mt-3 pagination-className">
                                    <div className={this.state.users.length > 0 ? '' : 'hide-element'}>
                                        <ul className="pagination pagination-sm justify-content-end">
                                            <div
                                                className={this.state.prevPageUrl === null ? "page-item disabled" : "page-item"}>
                                                <li className="page-item"><a ref={a => this.previousUrl = a} className="page-link" onClick={this.handlePager} href={this.state.prevPageUrl}>Previous</a>
                                                </li>
                                            </div>
                                            <li className="page-item active">
                                                <a className="page-link" onClick={this.handlePager}
                                                   href="#">{this.state.currentPage}<span
                                                    className="sr-only">(current)</span></a>
                                            </li>
                                            <li className={this.state.to === this.state.total ? "hide-element" : 'page-item'}><a className="page-link" onClick={this.handlePager} href={this.state.nextPageUrl}>{this.state.nextPage}</a>
                                            </li>
                                            <div
                                                className={this.state.nextPageUrl === null ? "page-item disabled" : "page-item"}>
                                                <li className="page-item "><a className="page-link" onClick={this.handlePager} href={this.state.nextPageUrl}>Next</a>
                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                {/*this is Delete section*/}
                <DeleteUser user={this.state.user}/>
                {/*this is add section*/}
                <AddUser/>
                {/*this is edit section*/}
                <EditUser user={this.state.user} />
            </div>
        );

    }
}

export default MemberTable;