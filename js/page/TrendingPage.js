import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import actions from '../action/index'

class TrendingPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TrendingPage</Text>
        <Button
          title="改变主题色--红色"
          onPress={() => {
            this.props.onThemeChange('red')
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
)(TrendingPage)
