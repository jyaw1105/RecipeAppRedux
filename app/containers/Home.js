import React, {Component} from 'react'
import ReactNative from 'react-native'
const{
  ScrollView,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  Picker,
  TouchableOpacity,
  ToastAndroid
} = ReactNative
import {connect} from 'react-redux'
import TabNavigator from 'react-native-tab-navigator'
import {ActionCreators} from '../actions'
import {bindActionCreators} from 'redux'

class SearchBar extends Component{
  constructor(props){
    super(props);
  this.state = {ingredientsInput: '',visible:false}
  }

  searchFunction(){
    if(this.state.ingredientsInput !== '')
      {this.props.navigation.state.params.searchRecipe(this.state.ingredientsInput);}
    else {
      this.props.navigation.state.params.searchAll;
    }
  }

  render(){
    return (<View style={{flexDirection:'row',flex:1}}>
      {this.state.visible ?
    <View style={{flexDirection:'row'}}>
    <TextInput
      style = {{width:150}}
      ref={input => { this.textInputSearch = input }}
      returnKeyType='search'
      placeholder='search ingredients'
      onChangeText={(ingredientsInput) => this.setState({ingredientsInput})}
      value={this.state.ingredientsInput}/>
      <TouchableHighlight style={{ alignSelf:'center'}} onPress={ () => {this.textInputSearch.setNativeProps({text: ''})}}>
      <Image
        source={require('./ic_cancel.png')}
        style={{ width: 40, height: 40 }}/>
      </TouchableHighlight>
      </View> : null}
        <TouchableHighlight style={{ alignSelf:'center'}} onPress={ () => {this.setState({visible:true});this.searchFunction();}}>
          <Image
          source={require('./ic_search.png')}
          style={{ width: 50, height: 50 }}/>
        </TouchableHighlight>
      </View>
      );
  }
}
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {ingredientsInput: '', searching: false, type: 'All', visibility: true,search:true,type1:'All',visible:false,title:'RecipeApp'}
  }

  componentDidMount(){
      this.searchAll();
      this.props.navigation.setParams({searchRecipe:this.searchRecipe.bind(this),searchAll:this.searchAll.bind(this)});
  }

  componentDidUpdate(){
    if(this.state.type !== this.state.type1){
      this.searchTypePressed();
      this.setState({type: this.state.type1});
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'RecipeApp',
      headerTintColor: '#B5651D',
      headerLeft: <Image
        source={require('./ic_recipe.png')}
        style={{ width: 50, height: 50,marginLeft:10 }}
        />,
      headerRight: <SearchBar navigation={navigation}/>
    }
  };

  TitleChange(){
    return 'RecipeApp'
  }
  searchAll(){
      this.setState({searching: true})
      this.props.fetchRecipes().then((res) => {
        this.setState({searching: false, visibility:true,type: this.state.type1})
    });
  }

  searchTypePressed(){
    if(this.state.type1 !== 'All'){
      this.setState({searching: true})
      this.props.fetchRecipesByType(this.state.type1).then((res) => {
        this.setState({searching: false, visibility:false,type: this.state.type1})
      });
    }else{
        this.searchAll();
    }
  }

  searchRecipe(ingredient){
    this.setState({searching: true})
    this.props.searchRecipe(ingredient).then((res) => {
      this.setState({searching: false, visibility:true})
    });
  }

  clearInput(){
    this.textInputSearch.setNativeProps({text: ''})
  }
  recipes(){
    return Object.keys(this.props.searchedRecipes).map(key => this.props.searchedRecipes[key])
  }

  detail_pressed(recipe){
    this.props.navigation.navigate("Detail",{recipe: recipe});
  }

  render(){
    return <View style={{flex:1}}>

    <Picker menu={'dropdown'} selectedValue={this.state.type1}
      onValueChange={(itemValue, itemIndex) => {this.setState({type1: itemValue})}}>
      <Picker.Item label="All" value="All"/>
      <Picker.Item label="Vegetarian" value="Vegetarian"/>
      <Picker.Item label="Fast Food" value="Fast Food"/>
      <Picker.Item label="Healthy" value="Healthy"/>
      <Picker.Item label="No-Cook" value="No-Cook"/>
      <Picker.Item label="Make Ahead" value="Make Ahead"/>
    </Picker>

    <View style={{flex:1, marginBottom:20}}>
      <ScrollView>
        {!this.state.searching && this.recipes().map((recipe) => {
          return (
          <TouchableHighlight style={styles.resultRow} onPress={ () => {this.detail_pressed(recipe)}}>
            <View style={{flexDirection: 'row', flex:1}}>
            <Text style={styles.resultText} numberOfLines = {1} ellipsizeMode ={'tail'}>{recipe.name}</Text>
            {this.state.visibility ?<Text style={{fontSize:15,position: 'absolute',right:0, textAlign:'right'}}>{recipe.type}</Text> : null}
            </View>
          </TouchableHighlight>
          );
        })}
        {this.state.searching ? <Text style={{textAlign:'center',fontSize:27}}>Searching...</Text> : null }
      </ScrollView>
    </View>
    <View style={{alignSelf: 'flex-end',position: 'absolute', bottom: 0,right: 0,margin:10}}>
    <TouchableOpacity
      style={{borderWidth:1, borderColor:'#B5651D', alignItems:'center', justifyContent:'center', width:70, height:70, backgroundColor:'#fff', borderRadius:150,}}
      onPress={()=>this.props.navigation.navigate("Add")}
    >
      <Image
        source={require('./ic_add.png')}
        style={{ width: 50, height: 50 }}
      />
      </TouchableOpacity>
    </View>
  </View>
  }
}

const styles = StyleSheet.create({
  scene:{
    flex:1,
    marginTop:20,
  },
  row:{
    height: 30,
  },
  searchSection:{
    borderBottomWidth: 1,
    padding: 5,
    height:50,
    flexDirection:'row',
  },
  searchInput:{
    flex: 1,
  },
  searchButton:{
    flex: 0.3,
  },
  scrollSection:{
    flex: 0.8,
  },
  resultRow:{
    height: 25,
    margin: 10,
  },
  resultText:{
    fontSize: 20,
    flex:0.75
  },
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {
  return {searchedRecipes: state.searchedRecipes,}
},mapDispatchToProps)(Home);
