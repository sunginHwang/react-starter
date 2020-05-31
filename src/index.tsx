import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from './store';

const renderReactApp = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(renderReactApp, document.getElementById('root'));

