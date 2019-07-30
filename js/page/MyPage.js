import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import actions from '../action/index.js'

class MyPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20
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
