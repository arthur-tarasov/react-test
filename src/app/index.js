import React from 'react';
import ReactDOM from 'react-dom';
import { App }from './components/App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
require("babel-polyfill");
import "./css/main.less"
ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
), document.getElementById('app'));