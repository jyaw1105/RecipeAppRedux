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
  ScrollView,
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

class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      detailType: this.props.navigation.state.params.type,
      detailIngredient:this.props.navigation.state.params.ingredient,
      detailStep:this.props.navigation.state.params.step,
      id : this.props.navigation.state.params.id,
      detailName : this.props.navigation.state.params.name,
  }
}

  static navigationOptions = ({navigation}) => ({
    title: 'Edit Recipe',
    headerTintColor: '#B5651D',
    headerRight: <TouchableOpacity
  onPress={navigation.state.params.DeleteRecipeFunction}>
    <Image
  source={require('./ic_delete.png')}
  style={{ width: 50, height: 50 }}/>
  </TouchableOpacity>,
  });

  componentDidMount(){
      this.props.navigation.setParams({DeleteRecipeFunction:this.DeleteRecipeFunction.bind(this)});
  }

  validation(){
    if(this.state.detailName == ''){
      ToastAndroid.showWithGravity("Name cannot be empty", ToastAndroid.SHORT,ToastAndroid.CENTER);
      return false;
    }else if(this.state.detailStep == ''){
      ToastAndroid.showWithGravity("Step cannot be empty", ToastAndroid.SHORT,ToastAndroid.CENTER);
      return false;
    }else if(this.state.detailIngredient == ''){
      ToastAndroid.showWithGravity("Ingredient cannot be empty", ToastAndroid.SHORT,ToastAndroid.CENTER);
      return false;
    }
    return true;
  }

  DeleteRecipeFunction(){
    Alert.alert(
          'Delete Recipe', 'Are you sure to delete?',
            [{text: 'Delete', onPress:()=>{this.props.deleteRecipes(this.state.id).then((res) => {ToastAndroid.showWithGravity(this.props.responseRecipe.message, ToastAndroid.SHORT,ToastAndroid.CENTER);
            if(this.props.responseRecipe.status == 1){
              this.props.navigation.dispatch(resetAction);
            }
            });}
            },
            {text: 'Cancel'}],
          {cancellable: true}
        );
  }




  EditRecipeFunction(){
    if(this.validation()){
    this.props.editRecipes(this.state.id,this.state.detailName,this.state.detailIngredient,this.state.detailStep,this.state.detailType).then((res) => {
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
          <TextInput style={styles.inputSingle} value={this.state.detailName} placeholder="Recipe Name" onChangeText={(detailName)=> this.setState({detailName})}/>
        </View>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.textAdd}>Type: </Text>
        <Picker style={{flex:1, alignItems:'center',marginLeft:10}} menu={'dropdown'} selectedValue={this.state.detailType}
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
          value={this.state.detailIngredient}
          placeholder="Enter Ingredient(s)"
          onChangeText={(detailIngredient)=> this.setState({detailIngredient})}
          multiline = {true} numberOflines = {3}
          />
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.textAdd}>Step(s): </Text>
          <TextInput
          windowSoftInputMode="adjustResize"
          value={this.state.detailStep}
          style={{flex: 1, height: 150,fontSize: 22,margin: 10}}
          placeholder="Enter Steps(s)"
          onChangeText={(detailStep)=> this.setState({detailStep})}
          multiline = {true} numberOflines = {4}
          />
        </View>
        <View style={styles.viewBottom}>
        <Button style={{flexDirection: 'row',alignSelf: 'flex-end',position: 'absolute', bottom: 0,margin:10}} title='Done' onPress={() => this.EditRecipeFunction()}/>
        </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene:{
    margin:10,
    flex:1,
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
  viewBottom:{
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignSelf:'center',
    right:0
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {responseRecipe: state.responseRecipe}
},mapDispatchToProps)(Edit);
