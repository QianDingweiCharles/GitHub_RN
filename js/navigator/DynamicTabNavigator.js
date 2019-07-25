import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import PopularPage from '../page/PopularPage.js'
import TrendingPage from '../page/TrendingPage.js'
import FavoritePage from '../page/FavoritePage.js'
import MyPage from '../page/MyPage.js'

const TABS = {
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

const TABOPTIONS = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#e91e63' : 'blue'
  }
}

const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
const tabs = { PopularPage, TrendingPage, FavoritePage }

export default createBottomTabNavigator(tabs, TABOPTIONS)
