import React, { Fragment } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen'

export default class WelcomePage extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      const { navigate } = this.props.navigation
      navigate('Main')
    }, 2000)
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
