import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import actions from '../action'
import NavigationBar from '../common//NavigationBar'
import TrendingItem from '../common/trendingItem'
import TrendingDialog, { TimeSpans } from '../common/TrendingDialog'

const URL = 'https://github.com/trending/'
const TITLE_COLOR = '#678'
const PAGE_SIZE = 10

export default class TrendingPage extends React.Component {
  constructor(props) {
    super(props)
    this.tabNames = ['All', 'C', 'C#', 'PHP', 'Javascript']
    this.state = {
      timeSpan: TimeSpans[0]
    }
  }

  _genTabs() {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item} />,
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

  renderTitleView = () => {
    return (
      <View>
        <TouchableOpacity
          ref='button'
          underlayColor='transparent'
          onPress={() => this.dialog.show()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: '400' }}>
              趋势{this.state.timeSpan.showText}
            </Text>
            <MaterialIcons
              name={'arrow-drop-down'}
              size={22}
              style={{ color: 'white' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  onSelectTimeSpan = (tab) => {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab
    })
  }

  renderTendingDialog = () => {
    return (
      <TrendingDialog
        ref={dialog => this.dialog = dialog}
        onSelect={tab => this.onSelectTimeSpan(tab)}
      />
    )
  }

  render() {
    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = (
      <NavigationBar
        titleView={this.renderTitleView()}
        style={statusBar}
        style={{ backgroundColor: TITLE_COLOR, }}
      />
    )
    const TabNavigator = this._tabNavigator()
    return (
      <View style={{ flex: 1, marginTop: 0 }}>
        {navigationBar}
        <TabNavigator />
        {this.renderTendingDialog()}
      </View>
    )
  }
}

class TrendingTab extends React.Component {
  constructor(props) {
    super(props)
    const { tabLabel, timeSpan } = this.props
    this.storeName = tabLabel
    this.timeSpan = timeSpan
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = (loadMore) => {
    const { onRefreshTrending, onLoadMoreTrending } = this.props
    const store = this._store()
    const url = this.genFetchUrl(this.storeName)
    if (loadMore) {
      onLoadMoreTrending(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, () => {
        this.refs.toast.show('没有更多了')
      })
    } else {
      onRefreshTrending(this.storeName, url, PAGE_SIZE)
    }
  }

  _store = () => {
    const { trending } = this.props
    let store = trending[this.storeName] // 动态获取state
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],
        hideLoadingMore: true
      }
    }
    return store
  }

  genFetchUrl = key => {
    if (key !== 'All') {
      return URL + key + '?' + this.timeSpan.searchText
    } else {
      return URL + '?' + this.timeSpan.searchText
    }
  }

  renderItem = ({ item }) => {
    return (
      <TrendingItem
        item={item}
        onSelect={() => { }}
      />
    )
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }

  render() {
    let store = this._store()
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={this.renderItem}
          keyExtractor={item => '' + (item.fullName)}
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
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => { // onMomentumScrollBegin一定要保证在onEndReached调用然后通过canLoadMore避免初始化时页面canLoadMore调用两次
            setTimeout(() => {
              if (this.canLoadMore) {
                this.loadData(true)
                this.canLoadMore = false
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    trending: state.trending
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRefreshTrending: (storeName, url, pageSize) =>
      dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) => (
      dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack))
    )
  }
}

const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingTab)

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
    margin: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  tabStyle: {
    // minWidth: 50s
    padding: 0
  },
  indicator: {
    color: 'red',
    margin: 10
  }

})

const TabNavigatorConfig = {
  tabBarOptions: {
    tabStyle: styles.tabStyle,
    upperCaseLabel: false,
    scrollEnabled: true,
    style: {
      backgroundColor: '#678',
      height: 30
    },
    indicatorStyle: styles.indicatorStyle,
    labelStyle: styles.labelStyle
  }
}

