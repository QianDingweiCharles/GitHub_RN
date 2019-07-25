import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import PopularPage from './PopularPage.js'
import TrendingPage from './TrendingPage.js'
import FavoritePage from './FavoritePage.js'
import MyPage from './MyPage.js'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default createBottomTabNavigator(
  {
    PopularPage: {
      screen: PopularPage,
      navigationOptions: {
        tabBarLabel: '最热',
        tabBarIcon: ({ tintColor, focused }) => (
          <AntDesign
            name={'clouddownloado'}
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
          <AntDesign
            name={'clouddownloado'}
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
          <AntDesign
            name={'clouddownloado'}
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
          <AntDesign
            name={'clouddownloado'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#f00'
    }
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20
  }
})
