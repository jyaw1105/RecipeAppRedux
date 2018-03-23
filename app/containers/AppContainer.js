import React, {Component} from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'
import {ActionCreators} from '../actions'
import {bindActionCreators} from 'redux'
import AppNavigation from './AppNavigation'
import { StackNavigator } from 'react-navigation';
const{
  View,
  Text,
  Button,
  TouchableHighlight,
} = ReactNative

 class AppContainer extends Component{
   constructor(props) {
      super(props);
      this.state = { recipeCount: 0}
    }

  recipeCount(){
    this.props.RecipeCount();
  }
  render(){
    return <AppNavigation {...this.props}/>
  }
}
function mapStateToProps(state){
  return {navigation: state.navigationReducer};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AppContainer);
