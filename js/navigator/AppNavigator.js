import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
import DynamicTabNavigator from './DynamicTabNavigator'
import { connect } from 'react-redux'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from 'react-navigation-redux-helpers'

export const rootCom = 'Init'

const initNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null
    }
  }
})

const MainNavigator = createStackNavigator({
  DynamicTabNavigator: {
    screen: DynamicTabNavigator,
    navigationOptions: {}
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {}
  }
})

export const RootNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Init: initNavigator,
      Main: MainNavigator
    },
    {
      initialRouteName: 'Init',
      navigationOptions: {
        header: null
      }
    }
  )
)

export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root'
)

const AppWithNavigationState = createReduxContainer(RootNavigator, 'root')

const App = createReduxContainer(RootNavigator)

const mapStateToProps = state => ({
  state: state.nav //v2
})

export default connect(mapStateToProps)(App)
