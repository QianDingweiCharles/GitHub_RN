import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'

import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'

const initNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null
    }
  }
})

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {}
  }
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Init: initNavigator,
      Main: MainNavigator
    },
    {
      initialRouteName: 'Init'
    }
  )
)