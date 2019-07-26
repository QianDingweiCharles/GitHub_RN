import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil.js'

class PopularTab1 extends React.Component {
  render() {
    // const { navigation } = this.props
    return (
      <View style={styles.container}>
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

class PopularTab2 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Tab2</Text>
      </View>
    )
  }
}

class PopularTab3 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Tab3</Text>
      </View>
    )
  }
}

class PopularTab4 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Tab4</Text>
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

export default createMaterialTopTabNavigator(
  {
    PopularTab1: {
      screen: PopularTab1,
      navigationOptions: {
        tabBarLabel: 'All'
      }
    },
    PopularTab2: {
      screen: PopularTab2,
      navigationOptions: {
        tabBarLabel: 'IOS'
      }
    },
    PopularTab3: {
      screen: PopularTab3,
      navigationOptions: {
        tabBarLabel: 'Android'
      }
    },
    PopularTab4: {
      screen: PopularTab4,
      navigationOptions: {
        tabBarLabel: 'MI'
      }
    }
  },
  {
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
)
