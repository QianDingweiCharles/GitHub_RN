import React, { Fragment } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import NavigationUtil from '../navigator/NavigationUtil.js'

export default class WelcomePage extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      NavigationUtil.resetToHomePage({ navigation: this.props.navigation })
    }, 200)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>WelcomePage</Text>
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
  }
})
