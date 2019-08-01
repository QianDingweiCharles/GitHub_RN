import React from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'

export default class FetchDemoPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchKey: '',
      showText: ''
    }
  }

  loadData () {
    const url = `https://github.com/search?q=${this.state.searchKey}`
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        throw new Error('Network response was not ok')
      })
      .then(responseText => {
        this.setState({
          showText: responseText
        })
      })
      .catch(e => {
        this.setState({
          showText: e.toString()
        })
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Fetch使用</Text>
        <View style={styles.input_container}>
          <TextInput
            onChangeText={searchKey => this.setState({ searchKey })}
            style={styles.input}
          />
          <Button
            title={'输入关键字获取'}
            onPress={() => {
              this.loadData()
            }}
          />
        </View>
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
