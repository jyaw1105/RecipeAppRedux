import React, {Component} from 'react'
import {View,Image} from 'react-native'
import {connect} from 'react-redux'
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home'
import About from './About'

class ApplicationTabs extends Component{
  constructor(props){
    super(props);
    this.state = {selectedTab: 'home'}
  }
  static navigationOptions = ({navigation}) => ({
    title: 'RecipeApp',
    headerTintColor: '#B5651D',
    headerLeft: <Image
      source={require('./ic_recipe.png')}
      style={{ width: 50, height: 50,marginLeft:10 }}
    />,
  });
  render(){
    return <TabNavigator>
    <TabNavigator.Item
      selected={this.state.selectedTab === 'home'}
      title="Home"
      onPress={() => this.setState({selectedTab: 'home'})}>
        <Home {...this.props} />
    </TabNavigator.Item>
    <TabNavigator.Item
      selected={this.state.selectedTab === 'about'}
      title="About"
      onPress={() => this.setState({selectedTab: 'about'})}>
        <About {...this.props} />
    </TabNavigator.Item>
    </TabNavigator>
  }
}

function mapStateToProps(state){
  return{

  }
}
export default connect(mapStateToProps)(ApplicationTabs);
