import React from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import actions from '../action/index.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import NavigationBar from '../common//NavigationBar'


const TITLE_COLOR = '#678'

class MyPage extends React.Component {
  getRightButton() {
    return <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => { }}
      >
        <View style={{ padding: 5, marginRight: 8 }}>
          <Feather
            name={'search'}
            size={24}
            style={{ color: 'white' }}
          />
        </View>
      </TouchableOpacity>
    </View>
  }

  getLeftButton(callBack) {
    return (
      <TouchableOpacity
        style={{ padding: 8, paddingLeft: 12 }}
        onPress={callBack}
      >
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{ color: 'white' }}
        />
      </TouchableOpacity>
    )
  }
  render() {
    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = (
      <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={{ backgroundColor: TITLE_COLOR }}
        rightButton={this.getRightButton()}
        leftButton={this.getLeftButton()}
      />
    )
    return (
      <View style={styles.container}>
        {navigationBar}
        <Text>Popular</Text>
        {/* <Text>{tabLabel}</Text> */}
        <Button
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'DetailPage'
            )
          }}
          title="跳转到详情页面"
        />
        <Button
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'FetchDemoPage'
            )
          }}
          title="跳转到FetchDemo"
        />
        <Button
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'DataStoreDemoPage'
            )
          }}
          title="跳转到AsyncStorageDemoPage"
        />
        <Button
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'DataStoreDemoPage'
            )
          }}
          title="离线缓存框架"
        />
        <Text style={styles.welcome}>MyPage</Text>
        <Button
          title="改变主题色---黄色"
          onPress={() => {
            this.props.onThemeChange('yellow')
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
  return {
    onThemeChange: theme => dispatch(actions.onThemeChange(theme))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage)
