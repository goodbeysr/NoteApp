import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  Keyboard,
  StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class Log extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "Who are you ?",
    };
  }
  _handlePress(e){
    e.preventDefault();
    Keyboard.dismiss();
    let t = this.state.username;
    if(pseudos.indexOf( t ) >= 0){
      Actions.noteBar({pseudo: t});
    }else{
        Alert.alert("Wrong username");
      }
  }
  inputHandle(text){
    this.setState({username: text ? text : "Who are you ?"});
  }
  render(){
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder={this.state.username}
          onChangeText = { text => this.inputHandle(text) }
        />

        <Button
        style={{backgroundColor:"#ae173d",marginTop:23,paddingTop:10,paddingBottom:10,paddingLeft:30,paddingRight:30,fontSize: 18,color:"#fff",borderRadius:4}}
        onPress={e => this._handlePress(e)}>
        Go  !
        </Button>

      </View>
    )
  }
}

const pseudos = ["pumm"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    padding: 7,
    height: 70,
    width: 200,
    fontSize: 25,
    textAlign:'center'
  }
});
