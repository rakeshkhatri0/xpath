import React,{Component} from 'react';
import axios from 'axios';

class Logout extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let uri = 'member/logout';
        axios.get(uri)
            .then(response => {
                console.log(response);
                if(response.data.isLogged) {
                    this.props.history.push('/member/login');
                }
                this.props.history.push('/member/login');
            }).catch(error => {
            console.log(error.response)
        });
    }
    render(){
        return(
            <div>
            </div>
        );
    }
}
export default Logout;