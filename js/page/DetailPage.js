import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class DetailPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>DetailPage</Text>
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
