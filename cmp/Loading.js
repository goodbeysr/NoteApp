import React , { Component } from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';


export default class Loading extends Component {
  static loadingService(callBack){
    setTimeout(callBack,1240);
  }
  render(){
    return (
      <View style={styles.icon}>
        <Image style={{width:100,height:100}} source = {require('../icons/ic_launcher.png')}></Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
