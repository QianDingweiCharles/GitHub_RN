import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil.js'

export default class PopularPage extends React.Component {
  constructor(props) {
    super(props)
    this.tabNames = ['Java', 'Android', 'IOS', 'React', 'ReactNative', 'PHP']
  }

  _genTabs() {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTab {...props} tabLabel={item} />,
        navigationOptions: {
          tabBarLabel: item
        }
      }
    })
    return tabs
  }

  _tabNavigator() {
    return createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), TabNavigatorConfig)
    )
  }

  render() {
    const TabNavigator = this._tabNavigator()
    return (
      <View style={{ flex: 1, marginTop: 0 }}>
        <TabNavigator />
      </View>
    )
  }
}

class PopularTab extends React.Component {
  render() {
    const { tabLabel, navigation } = this.props
    return (
      <View>
        <Text>Popular</Text>
        <Text>{tabLabel}</Text>
        <Button
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'DetailPage'
            )
          }}
          title="跳转到详情页面"
        />
        {/* <Button
          title="改变主题色--金色"
          onPress={() => {
            navigation.setParams({
              theme: {
                tintColor: 'black',
                updateTime: new Date().getTime()
              }
            })
          }}
        /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  tabStyle: {
    minWidth: 50
  }
})

const TabNavigatorConfig = {
  tabBarOptions: {
    tabStyle: styles.tabStyle,
    upperCaseLabel: false,
    scrollEnabled: true,
    style: {
      backgroundColor: '#678'
    },
    indicatorStyle: styles.indicatorStyle,
    labelStyle: styles.labelStyle
  }
}
