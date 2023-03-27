import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserHistory } from "history";
import {Provider} from 'react-redux';
import store from './store';
import { Router } from "react-router-dom";
export const history = createBrowserHistory();

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
