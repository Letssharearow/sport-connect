import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {configureStore} from '@reduxjs/toolkit'

import {Provider} from 'react-redux';
import datasetSlice from "./redux/reducers";

const container = document.getElementById('root');
const root = createRoot(container!);

const store = configureStore({
    reducer: {
        datasetSlice
    }
});

export type AppDispatch = typeof store.dispatch

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
