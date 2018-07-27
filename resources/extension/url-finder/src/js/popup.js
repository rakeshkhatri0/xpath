import React from 'react';
import ReactDOM from 'react-dom';
import CustomRouter from '../router/CustomRouter';

// include default axios conf
import '../common/axios.conf';
// styles
import '../styles/main.scss';

ReactDOM.render(<CustomRouter/>, document.getElementById('popup'));