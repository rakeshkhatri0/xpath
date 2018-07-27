import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';

// import axios config
import './common/axios.conf';
// import font awesome config
import './common/fontawesome.conf';
// imort stylesheet
import './styles/app.scss';

// custom components
import Login from './components/member/Login';
import Dashboard from './components/member/Dashboard';
import Logout from './components/member/Logout';
import AddProject from './components/project/AddProject';
import ShowProject from './components/project/ShowProject';
import EditProject from './components/project/EditProject';
import DeleteProject from './components/project/DeleteProject';
import ChangePassword from './components/member/ChangePassword';
import MemberTable from './components/member/MemberTable';
import AddUser from './components/member/AddUser';
import DeleteUser from './components/member/DeleteUser';
import EditUser from './components/member/EditUser';
import Profile from './components/member/Profile';

// render the app
ReactDOM.render((
    <HashRouter>
        <div>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/member/login" component={Login}/>
            <Route path="/member/dashboard" component={Dashboard}/>
            <Route path="/member/logout" component={Logout}/>
            <Route path="/member/changePassword" component={ChangePassword}/>
            <Route path="/member/table" component={MemberTable}/>
            <Route path="/member/add" component={AddUser}/>
            <Route path="/member/show/:id" component={EditUser}/>
            <Route path="/member/delete/:id" component={DeleteUser}/>
            <Route path="/member/logout" component={Logout}/>
            <Route path="/project/create" component={AddProject}/>
            <Route path="/project/index" component={ShowProject}/>
            <Route path="/project/show/:id" component={EditProject}/>
            <Route path="/project/delete/:id" component={DeleteProject}/>
            <Route path="/profile" component={Profile}/>

        </div>
    </HashRouter>
), document.getElementById('app'));