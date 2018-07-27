import React, {Component} from 'react';
// include font awesome conf
import FontAwesomeIcon from '../../common/fontawesome.conf';

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cx-wrapper wrapper-bg-color">
                <div className="d-flex justify-content-center">
                    <div className="p-3">
                        <FontAwesomeIcon icon="spinner" className="fa-spin fa-md"/>
                        <span className="pl-2">Loading please wait!</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loading;