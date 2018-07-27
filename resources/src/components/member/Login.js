import React, {Component} from 'react';
import axios from 'axios';
import FontAwesomeIcon from '../../common/fontawesome.conf';


class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isLogged: true
        };
        // check login
        axios.get('member/checkLogin').then(response => {
            if (response.data.status !== undefined && response.data.status) {
                this.props.history.push('/member/dashboard');
            }
        }).catch(e => {
            console.log(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const loginInfo = {
            email: this.email.value,
            password: this.password.value
        };
        axios.post('member/login', loginInfo).then(response => {
            console.log(response);
            if (response.data.status !== undefined && response.data.status) {
                this.props.history.push('/member/dashboard');
            } else {
                this.setState({
                    isLogged: response.data.status
                });
            }
        }).catch(error => {
            console.log(error.response)
        });
    }

    render() {
        return (
            <section className="cx-project-login mb-0 bg-image">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 col-md-8 col-lg-6 m-auto pt-4">
                            <div className="card">
                                <div className="card-body card-body-background content-center-body">
                                    <div className="d-flex justify-content-center header-text">Account Login</div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className={this.state.isLogged ? 'hide-element' : 'alert alert-danger'}>Either email or password is incorrect.</div>
                                        <div className="md-form">
                                            <FontAwesomeIcon icon="envelope"/>
                                            <input type="email" id="email" name="email" ref={input => this.email = input} className="form-control" required/>
                                            <label htmlFor="materialFormLoginEmailEx" className="text-gap"> Email Address</label>
                                        </div>
                                        <div className="md-form">
                                            <FontAwesomeIcon icon="lock"/>
                                            <input type="password" id="password" name="password" ref={input => this.password = input} className="form-control" required/>
                                            <label htmlFor="materialFormLoginPasswordEx" className="text-gap">Password</label>
                                        </div>
                                        <button className="btn btn-block text-center all-btn-submit wave-effect waves-light mb-3" type="submit">Sign In</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;