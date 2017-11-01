import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Keyboard,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import Note from './Note';
import * as firebase from 'firebase';

export default class NoteBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstDay: 0,
      modalVisible: false,
      lineNumber: 1,
      inputText:"",
      notes: {}
    }
    this._showModal = this._showModal.bind(this);
  }
  notesRef = this.getRef().child('notes');
  getRef(){
    return firebase.database().ref('/');
  }
  getNotes(notesRef){
    let tree = {};
    let notes = {};
    notesRef.on('value',(snap) => {
      tree = {...snap.val()};
      let i =0;
      Object.keys(tree).map(function(key) {
            notes[i] = {
              content: tree[key].content,
              user: tree[key].user,
              date: tree[key].date
            };
            i++;
     });
     this.setState({notes});
    });
  }
  componentWillMount(){
    const nowD = Date.now();
    const fDate = new Date("8/22/2017");

    let tmp = Math.abs(fDate.getTime()-nowD);

    tmp = Math.ceil(tmp/(1000*3600*24))-1;

    this.setState({firstDay:tmp});
    this.getNotes(this.notesRef);
  }
  _backPress(e){
    e.preventDefault();
    Actions.pop();
  }
  _showModal = (e) => {
    e.preventDefault();

    this.setState({ isModalVisible: true });
  };
  _hideModal = (e) => {
    e.preventDefault();
    this.notesRef.push({user:this.props.pseudo,date: (new Date()).toDateString(),content:this.state.inputText});
    this.setState({ isModalVisible: false,lineNumber:1 });
  };
  backPress(e){
    e.preventDefault();
    Keyboard.dismiss();
    this.setState({ isModalVisible: false,lineNumber:1 });
  }
  inputHandle(txt){
    this.setState({inputText:txt});
    let l = txt.length;
    console.log(l);
    if(l/20 > 1 && l/20 <=5 ){
      this.setState({lineNumber: Math.floor(l/20 + 1)});
    }
  }
  render(){
    const notes = Object.keys(this.state.notes).reverse().map( key => <Note key={key} detail={this.state.notes[key]}/>);

    return (
      <View style={styles.container}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          backgroundColor: this.props.pseudo === "driss" ? "#0088ae" : "#ae173d",
        }}>

          <Button
          style={{
            backgroundColor: this.props.pseudo === "driss" ? "#0088ae" : "#ae173d",
            height:70,
            textAlignVertical:'center',
            fontSize: 25,
            color:"#fff",
            width:80
          }}
          onPress={e => this._backPress(e)}>
          Back
          </Button>

          <View style={styles.firstDayCnt}>

            <Text style={styles.firstDay}>{this.state.firstDay}</Text>

          </View>

          <View>
            <Button
              style={{
                backgroundColor: this.props.pseudo === "driss" ? "#0088ae" : "#ae173d",
                height:70,
                textAlignVertical:'center',
                fontSize: 25,
                color:"#fff",
                width:80
              }}
            onPress={e => this._showModal(e)}>
            +
            </Button>
            <Modal
              backdropOpacity={0.2}
              backdropColor="#fff"
              isVisible={this.state.isModalVisible}
              animationInTiming={1000}
              animationOutTiming={1000}
              backdropTransitionInTiming={1000}
              backdropTransitionOutTiming={1000}
              onBackdropPress= {(e) => {this.backPress(e)}}
              >
              <View style={{
                backgroundColor: 'white',
                borderRadius: 4,
                borderColor: 'rgba(0, 0, 0, 0.1)',
                justifyContent:'center',

              }}>

                    <TextInput
                      multiline = {true}
                      numberOfLines = {this.state.lineNumber}
                      style={styles.input}
                      onChangeText = { txt => this.inputHandle(txt)}
                      value = {this.state.inputText}
                      placeholder="Type Some Text Here"
                      ></TextInput>

                  <View>
                    <Button
                      style={{
                        backgroundColor: this.props.pseudo === "driss" ? "#0088ae" : "#ae173d",
                        height:70,
                        textAlignVertical:'center',
                        fontSize: 25,
                        color:"#fff",
                        padding:5,
                        marginVertical: 7
                      }}
                    onPress={ e => this._hideModal(e)}>
                    Add Note
                    </Button>
                  </View>

              </View>
            </Modal>
          </View>

        </View>

        <View style={styles.NotesCnt}>
          <ScrollView >
            {
              notes ? notes : false
            }
          </ScrollView>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  firstDayCnt: {
    alignItems:'center',
    justifyContent:'center'
  },
  firstDay: {
    fontSize: 19,
    color:'white'
  },
  NotesCnt: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    margin: 21,
    fontSize: 16,
  }
});
