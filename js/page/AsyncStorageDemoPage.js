import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  AsyncStorage
} from 'react-native'

const KEY = 'sanve_key'

export default class AsyncStorageDemoPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchKey: '',
      showText: ''
    }
  }

  async doSave () {
    AsyncStorage.setItem(KEY, this.state.searchKey, (error, result) => {
      if (!error) {
        // 更新Favorite的key
        // this.updateFavoriteKeys(key, true)
      }
    })
  }

  // async doRemove () {
  //   AsyncStorage.getItem(KEY, (error, result) => {
  //     if (!error) {
  //       try {
  //         resolve(JSON.parse(result))
  //       } catch (e) {
  //         reject(error)
  //       }
  //     } else {
  //       reject(error)
  //     }
  //   })
  // }

  async getDate () {
    AsyncStorage.getItem(KEY, (error, result) => {
      if (!error) {
        try {
          this.setState({
            showText: result
          })
        } catch (e) {}
      } else {}
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>AsyncStorageDemoPage使用</Text>
        <View style={styles.input_container}>
          <TextInput
            onChangeText={searchKey => this.setState({ searchKey })}
            style={styles.input}
          />
        </View>
        <View>
          <Text
            onPress={() => {
              this.doSave()
            }}
          >
            存储
          </Text>
          <Text
            onPress={() => {
              this.doRemove()
            }}
          >
            删除
          </Text>
          <Text
            onPress={() => {
              this.getDate()
            }}
          >
            获取
          </Text>
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
