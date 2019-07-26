import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation'
import PopularPage from './PopularPage.js'
import TrendingPage from './TrendingPage.js'
import FavoritePage from './FavoritePage.js'
import MyPage from './MyPage.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

class TabComponent extends React.Component {
  constructor(props) {
    super(props)
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    }
  }

  render() {
    const { routes, index } = this.props.navigation.state
    console.log('HomePage navigation: ', this.props.navigation)
    if (routes[index].params) {
      const { theme } = routes[index].params
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme
      }
    }
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    )
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

const TabBarOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#e91e63' : 'blue'
  },
  tabBarComponent: TabComponent //TODO
}

export default createBottomTabNavigator(tabsConfig, TabBarOptions)
