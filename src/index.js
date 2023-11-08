import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import firebase from 'firebase/compat/app';
import { createStore, combineReducers } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBDv6FCRhVdQPqGjfGp2fexXpdoYu2qiis",
  authDomain: "jackson-datamatch-bootcamp.firebaseapp.com",
  databaseURL: "https://jackson-datamatch-bootcamp-default-rtdb.firebaseio.com",
  projectId: "jackson-datamatch-bootcamp",
  storageBucket: "jackson-datamatch-bootcamp.appspot.com",
  messagingSenderId: "609737918747",
  appId: "1:609737918747:web:3ed60e6a79b647cbc1abbe",
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

const store = createStore(rootReducer);
const rrfConfig = {
  userProfile: "users",
};
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
