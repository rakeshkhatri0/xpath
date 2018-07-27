import React from 'react';
import ReactDOM from 'react-dom';
import OptionRouter from '../router/OptionRouter';
import '../styles/option.scss';
// include default axios conf
import '../common/axios.conf';
// styles
import '../styles/option.scss';

// render the app
ReactDOM.render(<OptionRouter/>, document.getElementById('option-app'));