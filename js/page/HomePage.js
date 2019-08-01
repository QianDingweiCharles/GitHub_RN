import React from 'react'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import NavigationUtil from '../navigator/NavigationUtil'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import BackPressComponent from '../common/BackPressComponent/index.js'

class HomePage extends React.Component {
  constructor (props) {
    super(props)
    this.backPress = new BackPressComponent({ backPress: () => this.onBackPress() })
    this.onBackPress.bind(this)
  }

  componentDidMount () {
    this.backPress.componentDidMount()
  }

  componentWillUnmount () {
    this.backPress.componentWillUnmount()
  }

  onBackPress () {
    const { dispatch, nav } = this.props
    if (nav.routes[1].index === 0) {
      // 如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render () {
    NavigationUtil.navigation = this.props.navigation
    return <DynamicTabNavigator />
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(HomePage)
