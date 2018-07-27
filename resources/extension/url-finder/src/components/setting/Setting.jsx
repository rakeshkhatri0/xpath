import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Setting extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);

        this.state = {
            search_engine: '',
            timeout: '',
            page_size: '',
        };
    }

    handleChange1(e) {
        this.setState({
            search_engine: e.target.value
        });
    }

    handleChange2(e) {
        this.setState({
            timeout: e.target.value
        });
    }

    handleChange3(e) {
        this.setState({
            page_size: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let params = {
            search_engine: this.search_engine.value,
            timeout: this.time_out.value,
            page_size: this.page_size.value
        };

        //storing data to chrome storage
        chrome.storage.sync.set({params});
        this.props.history.push("/setting");
    }

    componentDidMount() {
       let $this=this;
        chrome.storage.sync.get(['params'],function (result) {
            console.log(result);
            $this.setState({
                search_engine:result.params.search_engine,
                timeout:result.params.timeout,
                page_size:result.params.page_size
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-4">
                        <div className="sidenav">
                            <Link to="/setting">Setting</Link>
                        </div>
                    </div>
                    <div className="col col-8">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Multiple Search Engine</label>
                                <input ref={input => this.search_engine = input} defaultValue={this.state.search_engine} onChange={this.handleChange1} type="text" className="form-control" id="formGroupExampleInput" placeholder="Search Engine"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput2">Refresh Time</label>
                                <input ref={input => this.time_out = input} type="text" defaultValue={this.state.timeout} onChange={this.handleChange2} className="form-control" id="formGroupExampleInput2" placeholder="Refresh Time"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput2">Total Result</label>
                                <input ref={input => this.page_size = input} defaultValue={this.state.page_size} type="text" onChange={this.handleChange3} className="form-control" id="formGroupExampleInput2" placeholder="Total Result"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setting;