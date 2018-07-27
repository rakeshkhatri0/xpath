import React, {Component} from 'react';
import {MemoryRouter, Route} from 'react-router'

import Option from '../components/Option';
import Setting from '../components/setting/Setting';

export default class CustomRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MemoryRouter>
                <div>
                    <div>
                        <Route pat='/' exact={true} component={Option}/>
                        <Route path='/setting' component={Setting}/>
                    </div>
                </div>
            </MemoryRouter>
        )
    }
}