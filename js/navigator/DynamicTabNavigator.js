import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {
  createBottomTabNavigator,
  BottomTabBar,
  createAppContainer
} from 'react-navigation'
import { connect } from 'react-redux'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import NavigationUtil from './NavigationUtil.js'

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
    let tabs = {}
    if (this.props.navigation.state.params) {
      /**
       * 取出上一个页面传过来的要显示的tab参数，也可以是从服务端下发的的Tab的配置，
       * 比如显示createBottomTabNavigator中的那些Tab,
       * 这个配置页可以是在其他页面获取之后通过AsyncStorage写入到本地缓存，
       * 然后在这里读取缓存，也可以通过其他方式如props、global config等获取
       ***/
      this.props.navigation.state.params.tabs.forEach(e => {
        //根据需要定制要显示的tab
        tabs[e] = TABS[e]
      })
    } else {
      const { PopularPage, TrendingPage, FavoritePage, MyPage } = tabsConfig //根据需要定制要显示的tab
      tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
    }
    return createAppContainer(
      createBottomTabNavigator(tabs, this._tabBarOptions())
    )
  }

  render() {
    NavigationUtil.navigation = this.props.navigation
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
