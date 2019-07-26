import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import actions from '../action/index.js'

class FavoritePage extends React.Component {
  render() {
    const { navigation } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FavoritePage</Text>

        <Button
          title="改变主题色--绿色"
          onPress={() => {
            this.props.onThemeChange('green')
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
)(FavoritePage)
