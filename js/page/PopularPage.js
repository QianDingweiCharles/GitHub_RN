import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  RefreshControl
} from 'react-native'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import { connect } from 'react-redux'
import actions from '../action'
import NavigationUtil from '../navigator/NavigationUtil.js'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const TITLE_COLOR = 'red'

export default class PopularPage extends React.Component {
  constructor(props) {
    super(props)
    this.tabNames = ['Java', 'Android', 'IOS', 'React', 'ReactNative', 'PHP']
  }

  _genTabs() {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          tabBarLabel: item
        }
      }
    })
    return tabs
  }

  _tabNavigator() {
    return createAppContainer(
      createMaterialTopTabNavigator(this._genTabs(), TabNavigatorConfig)
    )
  }

  render() {
    const TabNavigator = this._tabNavigator()
    return (
      <View style={{ flex: 1, marginTop: 0 }}>
        <TabNavigator />
      </View>
    )
  }
}

class PopularTab extends React.Component {
  constructor(props) {
    super(props)
    const { tabLabel } = this.props
    this.storeName = tabLabel
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    const { onLoadPopularData } = this.props
    const url = this.genFetchUrl(this.storeName)
    onLoadPopularData(this.storeName, url)
  }

  genFetchUrl = key => {
    return URL + key + QUERY_STR
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={{ backgroundColor: 'red' }}>{JSON.stringify(item)}</Text>
      </View>
    )
  }

  render() {
    const { popular } = this.props
    let store = popular[this.storeName] // 动态获取state
    if (!store) {
      store = {
        items: [],
        isLoading: false
      }
    }
    console.log("store.items:", store.items)
    return (
      <View style={styles.container}>
        <FlatList
          data={store.items}
          renderItem={this.renderItem}
          keyExtractor={item => '' + item.id}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={TITLE_COLOR}
              colors={[TITLE_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={TITLE_COLOR}
            />
          }
        />
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    popular: state.popular
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPopularData: (storeName, url) =>
      dispatch(actions.onLoadPopularData(storeName, url))
  }
}

const PopularTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopularTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  tabStyle: {
    minWidth: 50
  }
})

const TabNavigatorConfig = {
  tabBarOptions: {
    tabStyle: styles.tabStyle,
    upperCaseLabel: false,
    scrollEnabled: true,
    style: {
      backgroundColor: '#678'
    },
    indicatorStyle: styles.indicatorStyle,
    labelStyle: styles.labelStyle
  }
}
