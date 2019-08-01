import React from 'react'
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text } from 'react-native'
import DataStore from '../expand/dao/DataStore'

export default class DataStoreDemoPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showText: ''
    }
    this.dataStore = new DataStore()
  }

  loadData () {
    const url = `https://api.github.com/search/repositories?q=${this.value}`
    this.dataStore
      .fetchData(url)
      .then(data => {
        const showData = `初次加载时间： ${new Date(
          data.timeStamp
        )}\n${JSON.stringify(data.data)}`
        this.setState({ showText: showData })
      })
      .catch(error => {
        error && console.log(error.toString())
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>离线缓存框架设计</Text>
        <View style={styles.input_container}>
          <TextInput
            onChangeText={value => (this.value = value)}
            style={styles.input}
          />
        </View>
        <Button
          onPress={() => {
            this.loadData()
          }}
          title='获取数据'
        />
        <Text>{this.state.showText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20
  },
  input: {
    height: 50,
    width: 50,
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
