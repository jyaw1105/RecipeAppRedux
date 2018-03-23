import React, {Component} from 'react'
import {View, Text,StyleSheet, Button,TouchableOpacity, Image, Alert} from 'react-native'
import {connect} from 'react-redux'
import {ActionCreators} from '../actions'
import {bindActionCreators} from 'redux'

class Detail extends Component {
  constructor(props){
    super(props);
    this.state = {isLoading: true,
        detailId : this.props.navigation.state.params.recipe.id,
        detailName : this.props.navigation.state.params.recipe.name,
        detailIngredient : this.props.navigation.state.params.recipe.ingredient,
        detailStep : this.props.navigation.state.params.recipe.step,
        detailType : this.props.navigation.state.params.recipe.type,
      };
  }
  componentDidMount(){
    this.props.navigation.setParams({editPressed:this.editPressed.bind(this)});
  }

  static navigationOptions = ({navigation}) => ({
    title: "Info",
    headerTintColor: '#B5651D',
    headerRight: <TouchableOpacity
  onPress={navigation.state.params.editPressed}>
    <Image
  source={require('./ic_edit.png')}
  style={{ width: 50, height: 50 }}/>
  </TouchableOpacity>,
  });

  editPressed(){
      this.props.navigation.navigate("Edit",{id:this.state.detailId,name:this.state.detailName,ingredient:this.state.detailIngredient, step: this.state.detailStep, type: this.state.detailType})
  }
  render(){
    return <View style={styles.scene}>
    <Text style={styles.rowType}>Type: {this.state.detailType}</Text>
    <Text style={styles.rowDetail}>Name: {this.state.detailName}</Text>
    <Text style={styles.rowDetail}>Ingredients: {this.state.detailIngredient}</Text>
    <Text style={styles.rowDetail}>Steps: {this.state.detailStep}</Text>

    <View style={styles.viewBottom}>
    <Button style={styles.buttonBack} title='Back' onPress={() => this.props.navigation.goBack()}/>
    </View>

  </View>
  }
}

const styles = StyleSheet.create({
  scene:{
    flexDirection: 'column',
    margin:10,
    flex:1
  },
  rowType:{
    marginTop: 10,
    fontSize: 22,
    textAlign: 'right'
  },
  rowDetail:{
  marginTop:10,
    fontSize: 24
  },
  buttonBack:{
    fontSize: 24,
    padding: 5,
  },
  viewBottom:{
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignSelf:'center',
  }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {responseRecipe: state.responseRecipe}
},mapDispatchToProps)(Detail);
