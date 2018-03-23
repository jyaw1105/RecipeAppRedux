import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Picker,
  TextInput,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import {ActionCreators} from '../actions'
import {bindActionCreators} from 'redux'
import {NavigationActions} from 'react-navigation';

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home'})
    ] });

class Add extends Component {
  constructor(props){
    super(props);
    this.state = {type: 'Vegetarian',name: '', ingredient:'',step:''};
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Add Recipe',
    headerTintColor: '#B5651D',
    headerRight: <TouchableOpacity
    onPress={()=>{  Alert.alert(
        'Clear Recipe', 'Are you sure to clear?',
        [
          {text: 'Clear', onPress:navigation.state.params.cancelPressed},
          {text: 'Cancel'}
        ],
        {cancellable: true}
      );}}>
      <Image
    source={require('./ic_cancel.png')}
    style={{ width: 50, height: 50 }}/>
    </TouchableOpacity>,
  });

  componentDidMount(){
    this.props.navigation.setParams({cancelPressed:this.cancelPressed.bind(this)});
  }

  cancelPressed(){
    this.textInputName.setNativeProps({text: ''})
    this.textInputIngredient.setNativeProps({text: ''})
    this.textInputStep.setNativeProps({text: ''})
    this.setState({type:'Vegetarian'})
  }

  validation(){
    if(this.state.name == ''){
      ToastAndroid.showWithGravity("Name cannot be empty", ToastAndroid.SHORT,ToastAndroid.CENTER);
      return false;
    }else if(this.state.step == ''){
      ToastAndroid.showWithGravity("Step cannot be empty", ToastAndroid.SHORT,ToastAndroid.CENTER);
      return false;
    }else if(this.state.ingredient == ''){
      ToastAndroid.showWithGravity("Ingredient cannot be empty", ToastAndroid.SHORT,ToastAndroid.CENTER);
      return false;
    }
    return true;
  }

  AddRecipeFunction(){
    if(this.validation()){
    this.props.addRecipes(this.state.name,this.state.ingredient,this.state.step,this.state.type).then((res) => {
      if(this.props.responseRecipe.status == 1){
        this.props.navigation.dispatch(resetAction);
      }
    });
    }
  }

  render(){
    return(
      <View style={styles.scene}>
        <ScrollView>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.textAdd}>Name: </Text>
          <TextInput style={styles.inputSingle} ref={input => { this.textInputName = input }} placeholder="Recipe Name" onChangeText={(name)=> this.setState({name})}/>
        </View>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.textAdd}>Type: </Text>
        <Picker style={{flex:1, alignItems:'center',marginLeft:10}} menu={'dropdown'} selectedValue={this.state.type}
          onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
          <Picker.Item label="Vegetarian" value="Vegetarian"/>
          <Picker.Item label="Fast Food" value="`Fast Food`"/>
          <Picker.Item label="Healthy" value="Healthy"/>
          <Picker.Item label="No-Cook" value="No-Cook"/>
          <Picker.Item label="Make Ahead" value="Make Ahead"/></Picker>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.textAdd}>Ingredient: </Text>
          <TextInput
          style={{flex: 1, height: 100,fontSize: 22,margin: 10}}
           ref={input => { this.textInputIngredient = input }}
          placeholder="Enter Ingredient(s)"
          onChangeText={(ingredient)=> this.setState({ingredient})}
          multiline = {true} numberOflines = {3}
          />
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.textAdd}>Step(s): </Text>
          <TextInput
          style={{flex: 1, height: 150,fontSize: 22,margin: 10}}
          ref={input => { this.textInputStep = input }}
          placeholder="Enter Steps(s)"
          onChangeText={(step)=> this.setState({step})}
          multiline = {true} numberOflines = {4}
          />
        </View>
        <View style={{alignSelf: 'flex-end', bottom: 0,right: 0,margin:10}}>
        <Button title='Done' onPress={() => this.AddRecipeFunction()}/>
        </View>
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  scene:{
    margin:10,
    flex:1
  },
  rowIdType:{
    flexDirection: 'row',
    marginTop:10,
  },
  rowDetail:{
  marginTop:10,
    fontSize: 26
  },
  button:{
    fontSize: 24,
    flex:1,
    alignItems: 'center'
  },
  textAdd: {
    textAlign:'left',
    fontSize: 22,
    marginTop: 10,
    marginLeft:10
  },
  inputSingle: {
    flex: 1,
    height: 50,
    fontSize: 22,
    margin: 10
  },
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {responseRecipe: state.responseRecipe}
},mapDispatchToProps)(Add);
