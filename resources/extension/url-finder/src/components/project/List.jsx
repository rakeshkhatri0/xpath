import React, {Component} from 'react';
import axios from "axios/index";
//font awesome icon
import FontAwesomeIcon from '../../common/fontawesome.conf';

class List extends Component {
    constructor(props) {
        super(props);
        this.searchProject = this.searchProject.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePager = this.handlePager.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            searchEngine: '',
            projects: [],
            nextPageUrl: '',
            prevPageUrl: '',
            currentPage: '',
            nextPage: '',
            prevPage: '',
            to: '',
            total: '',
            pagerUrl: 'project/all',
            formFailed: false,
            errors: [],
            baseUrl: axios.defaults.baseURL
        };
        // set default search engine
        chrome.storage.sync.set({searchEngine: 'Google'});
    }

    handleSelect(e) {
        chrome.storage.sync.set({searchEngine: e.target.value});
    }

    //search the urls
    handleSearch(projectId) {
        chrome.storage.sync.get(['searchEngine'], function (result) {
            chrome.runtime.sendMessage({
                action: 'search',
                projectId: projectId,
                searchEngine: result.searchEngine
            });
        });
    }

    handlePager(e) {
        this.setState({pagerUrl: e.target.href}, () => {
            this.searchProject(null)
        });
    }

    searchProject() {
        let params = {
            keyword: this.search.value ? this.search.value : ''
        };
        let $this = this;
        axios.get(this.state.pagerUrl, {
            params: params
        }).then(response => {
            $this.setState({
                projects: response.data.data,
                nextPageUrl: response.data.next_page_url,
                currentPage: response.data.current_page,
                prevPageUrl: response.data.prev_page_url,
                prevPage: response.data.current_page - 1,
                nextPage: response.data.current_page + 1,
                total: response.data.total,
                to: response.data.to
            });
        }).catch(error => {
            console.log(error.response)
        });
    }

//methods call when the dom loads
    componentDidMount() {
        this.searchProject('');
    }

    render() {
        return (
            <div className="cx-wrapper wrapper-bg-color">
                {this.state.searchEngine}
                <section className="cx-search bg-color">
                    <div className="card-body input-group card-height mb-2 py-1 mt-2 text-muted">
                        <input className="form-control search-dialog" ref={input => this.search = input} onChange={this.searchProject} type="search" placeholder="Search by project name" aria-label="Search"/>
                        <div className="input-group-append ml-0">
                                <span className="input-group-text search-class text-muted" id="basic-addon2">
                                    <FontAwesomeIcon icon="search"/>
                                </span>
                        </div>
                    </div>
                </section>

                <div className={this.state.projects.length > 0 ? '' : 'hide-element'}>
                    <section className="cx-project-list bg-color">
                        <div className="container-fluid">
                            <table className="table table-sm table-hover table-striped">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="w-50">Project Name</th>
                                    <th className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.projects.map((project, i) => {
                                        return <tr key={i}>
                                            <td scope="row">
                                                {project.id}
                                            </td>
                                            <td className="w-50">
                                                {project.project_name}
                                            </td>
                                            <td className="text-center">
                                                <a className="btn btn-sm manage-search text-white" name="search" onClick={() => {
                                                    this.handleSearch(project.id)
                                                }}>Search
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" className="btn btn-sm manage-export text-white" href={this.state.baseUrl + "project/export/" + project.id}>Export</a>
                                            </td>
                                            <td>
                                                <select ref={(select) => this.searchEngine = select} onChange={this.handleSelect} className="form-control" defaultValue={this.state.searchEngine}>
                                                    <option value="">Select a Search Engine</option>
                                                    <option value="Yahoo">yahoo</option>
                                                    <option value="Google">google</option>
                                                    <option value="Bing">bing</option>
                                                    <option value="Duckduck">duckduck go</option>
                                                </select>
                                            </td>
                                        </tr>
                                    }
                                )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
                <div className={this.state.projects.length > 0 ? 'hide-element' : ''}><p align="center" className="mb-0 pb-4">No records to show</p></div>
                <div className={this.state.projects.length > 0 ? '' : 'hide-element'}>
                    <section className="cx-pagination bg-color">
                        <nav className="mt-3 pagination-class">
                            <ul className="pagination pagination-sm justify-content-end ul">
                                <li className={this.state.prevPageUrl === null ? "page-item disabled mr-2" : "page-item"}>
                                    <a className="page-link border border-light" onClick={this.handlePager} href={this.state.prevPageUrl}>Previous</a>
                                </li>
                                <div className={this.state.prevPage === 0 ? 'hide-element' : ''}>
                                    <li className="page-item">
                                        <a className="page-link border border-light" onClick={this.handlePager} href={this.state.prevPageUrl}>{this.state.prevPage} </a>
                                    </li>
                                </div>
                                <li className="page-item active">
                                    <a className="page-link border border-light" href="#">{this.state.currentPage} <span className="sr-only">(current)</span></a>
                                </li>
                                <li className={this.state.to === this.state.total ? "hide-element" : 'page-item'}>
                                    <a className="page-link border border-light" onClick={this.handlePager} href={this.state.nextPageUrl}>{this.state.nextPage}</a>
                                </li>
                                <li className={this.state.nextPageUrl === null ? "page-item disabled mr-2" : "page-item"}>
                                    <a className="page-link border border-light" onClick={this.handlePager} href={this.state.nextPageUrl}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    </section>
                </div>
            </div>
        )
    }
}

export default List;