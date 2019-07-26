import { combineReducers } from 'redux'
import theme from './theme'
import { createNavigationReducer } from 'react-navigation-redux-helpers'
import { rootCom, RootNavigator } from '../navigator/AppNavigator'

//1.指定默认state
const navState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(rootCom)
)

const navReducer = createNavigationReducer(RootNavigator)

const index = combineReducers({
  nav: navReducer,
  theme: theme
})

export default index
