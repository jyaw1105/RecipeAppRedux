import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNavigationHelpers, StackNavigator } from 'react-navigation';
import Home from './Home'
import Detail from './Detail'
import About from './About'
import Add from './Add'
import Edit from './Edit'
export const RootStack = StackNavigator({Home: {screen: Home,}, Detail: {screen: Detail,}, Add: {screen: Add,}, Edit: {screen: Edit},},{initialRouteName: 'Home',});

class AppNavigation extends Component{
  render(){
    return(
      <RootStack navigationState={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
      })} />
    )
  }
}

const mapDispatchToProps =state => {
  return {navigationState: state.navigationReducer};
}

export default connect(mapDispatchToProps)(AppNavigation);
