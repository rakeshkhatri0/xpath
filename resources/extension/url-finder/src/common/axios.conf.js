import axios from 'axios';

// request as ajax
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// default content type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// set backend CSRF token
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token !== null && token.content !== undefined) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

// set base Url
let baseUrl = document.head.querySelector('meta[name="base-url"]');
if (baseUrl !== null && baseUrl.content !== undefined) {
    axios.defaults.webUrl = baseUrl.content + '#/';
    axios.defaults.baseURL = baseUrl.content + 'api/';
} else {
    axios.defaults.webUrl = 'http://localhost:8090/#/';
    axios.defaults.baseURL = 'http://localhost:8080/api/';
}
