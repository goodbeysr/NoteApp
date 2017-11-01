import React , { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Loading from './Loading';
import Log from './Log';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded : false
    }
    Loading.loadingService(v => this.setState({loaded : true}));
  }
  render(){
    return (
      <View style={styles.container}>
        { this.state.loaded ? <Log/> : <Loading/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
