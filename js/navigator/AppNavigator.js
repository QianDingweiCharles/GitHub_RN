import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
import { connect } from 'react-redux'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import FetchDemoPage from '../page/FetchDemoPage.js'

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
  HomePage: {
    screen: HomePage,
    navigationOptions: {}
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {}
  },
  FetchDemoPage: {
    screen: FetchDemoPage,
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

const App = createReduxContainer(RootNavigator)

const mapStateToProps = state => ({
  state: state.nav //v2
})

export default connect(mapStateToProps)(App)
