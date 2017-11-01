import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import Button from 'react-native-button';

export default class Note extends Component {
  constructor(props){
    super(props);
    this.state = {
      color:"#0088ae",
    }
  }
  componentWillMount(){
    this.setState({color:this.props.detail.user === "driss" ? "#0088ae" : "#ae173d" });
  }
  render(){
    return (
      <View style={{
        flex: 1,
        marginTop:10,
        marginBottom:10,
        marginLeft:50,
        marginRight:50,
        width:250,
        padding:14,
        backgroundColor:this.state.color}}>

        <View style={styles.header}>
          <Text style={styles.date}>{this.props.detail.date}</Text>
        </View>

        <View style={styles.txtCnt}>
          <ScrollView>

              <Text style={styles.txt}>{this.props.detail.content}</Text>

          </ScrollView>
        </View>

        <View>
          <Text></Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  NoteCnt:{

  },
  header:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginBottom:10,
  },
  date:{
    fontSize:15,
    color:'white',
    fontWeight:'bold',
    marginRight:7
  },
  txtCnt:{
    flex:1,
  },
  txt:{
    color:'white',
    textAlign:'center',
    fontSize:18,
  }
});
