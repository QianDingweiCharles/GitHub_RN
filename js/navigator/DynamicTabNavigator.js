import React from 'react'
import {
  createBottomTabNavigator,
  BottomTabBar,
  createAppContainer
} from 'react-navigation'
import { DeviceInfo } from 'react-native'
import { connect } from 'react-redux'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

class TabComponent extends React.Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true
  }
  render() {
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />
  }
}

// 如何动态设置
const tabsConfig = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={'md-trending-up'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo name={'user'} size={26} style={{ color: tintColor }} />
      )
    }
  }
}

class DynamicTabNavigator extends React.Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true
  }

  _tabBarOptions() {
    const TabBarOptions = {
      tabBarOptions: {
        activeTintColor: 'blue'
      },
      tabBarComponent: props => (
        <TabComponent theme={this.props.theme} {...props} />
      )
    }
    return TabBarOptions
  }

  // 获取动态的Tab
  _tabNavigator() {
    if (this.Tabs) {
      return this.Tabs
    }
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = tabsConfig //根据需要定制要显示的tab
    const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }

    return (this.Tabs = createAppContainer(
      createBottomTabNavigator(tabs, this._tabBarOptions())
    ))
  }

  render() {
    const Tabs = this._tabNavigator()
    return <Tabs />
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme.theme
  }
}

export default connect(mapStateToProps)(DynamicTabNavigator)
