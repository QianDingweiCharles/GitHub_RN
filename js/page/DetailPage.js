import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util'
import NavigationUtil from '../navigator/NavigationUtil';

const TRENDINF_URL = 'https://github.com/'
const THEME_COLOR = '#678'


export default class DetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    const { projectModel } = this.params
    this.url = projectModel.html_url || TRENDINF_URL + projectModel.fullName
    const title = projectModel.full_name || projectModel.fullName
    this.state = {
      title: title,
      url: this.url,
      canGoBack: true
    }
  }

  renderRightButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => { }}
        >
          <FontAwesome
            name={'star-o'}
            size={20}
            style={{ color: 'white', marginRight: 10 }}
          />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => { })}
      </View>
    )
  }

  onNavigationStateChange = (naviState) => {
    const { canGoBack = true, url = '' } = naviState
    this.setState({
      canGoBack,
      url
    })
  }

  onBack = () => {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }

  render() {
    let navigationBar = <NavigationBar
      title={this.state.title}
      style={{ backgroundColor: THEME_COLOR, }}
      leftButton={ViewUtil.getLeftBackButton(() => { this.onBack() })}
      rightButton={this.renderRightButton()}
    />
    return (
      <View style={styles.container}>
        {navigationBar}
        <WebView
          ref={webView => this.webView = webView}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          source={{ uri: this.state.url }}
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
