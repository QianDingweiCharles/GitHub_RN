import { combineReducers } from 'redux'
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import { rootCom, RootNavigator } from '../navigator/AppNavigator'
import theme from './theme'
import popular from './popular'
import trending from './trending'

// 1.指定默认state
const navState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(rootCom)
)

const navReducer = createNavigationReducer(RootNavigator)

const index = combineReducers({
  nav: navReducer,
  theme,
  popular,
  trending
})

export default index
