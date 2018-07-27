import React, {Component} from 'react';
import {MemoryRouter, Route} from 'react-router'
import axios from 'axios';

import ProjectHeader from '../components/project/Header';
import ProjectList from '../components/project/List';
import ProjectAdd from '../components/project/Add';
import Setting from '../components/setting/Setting';
import LoginFailed from '../components/login/LoginFailed';
import Loading from '../components/login/Loading';

export default class CustomRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: null
        };
        // check login
        axios.get('member/checkLogin', {params: {request: 'explicit'}}).then(response => {
            if (response.data.status !== undefined) {
                this.setState({
                    isLogged: response.data.status
                });
            }
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
            <MemoryRouter>
                <div>
                    {this.state.isLogged ? (
                        <div>
                            <div>
                                <Route path='/' component={ProjectHeader}/>
                            </div>
                            <div>
                                <Route path='/' exact={true} component={ProjectList}/>
                                <Route path='/add' component={ProjectAdd}/>
                                <Route path='/setting' component={Setting}/>
                            </div>
                        </div>
                    ) : (
                        <Route path='/' component={this.state.isLogged === false ? LoginFailed : Loading}/>
                    )}
                </div>
            </MemoryRouter>
        )
    }
}