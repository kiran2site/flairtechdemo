import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './semantic.css'
import "./sai.css"
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css"
import 'semantic-ui-css/semantic.min.css'

import axios from 'axios'

axios.defaults.baseURL = "https://us-central1-flairtech-f6aa2.cloudfunctions.net/api"
ReactDOM.render(
                <App/>
    , document.getElementById('root'));
    // http://localhost:5000/flairtech-f6aa2/us-central1/api
    // https://us-central1-flair-d7b59.cloudfunctions.net/api
    // http://localhost:5000/flair-d7b59/us-central1/api

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
