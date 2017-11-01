/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import {
  Router,
  Scene
} from 'react-native-router-flux';
//Componenets
import Login from './cmp/Login';
import Log from './cmp/Log';
import NoteBar from './cmp/NoteBar';
import * as firebase from 'firebase';


// Initialize Firebase
  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: ""
  };
   firebase.initializeApp(config);

export default class NoteApp extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Login"
            component = {Login}
            hideNavBar
            initial
          />
          <Scene key="Log"
            component = {Log}
            hideNavBar
          />
          <Scene key="noteBar"
            component = {NoteBar}
            title = "noteBar"
            hideNavBar
          />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('NoteApp', () => NoteApp);
