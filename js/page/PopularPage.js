import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'
import { connect } from 'react-redux'
import Toast from 'react-native-easy-toast'
import actions from '../action'
import PopularItem from '../common/popularItem'
import NavigationBar from '../common//NavigationBar'
import NavigationUtil from '../navigator/NavigationUtil'
import { FLAG_STORAGE } from '../expand/dao/DataStore'
import FavoriteUtil from '../util/FavoriteUtil'
import FavoriteDao from '../expand/dao/FavoriteDao'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const TITLE_COLOR = '#678'
const PAGE_SIZE = 10
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)

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
    let statusBar = {
      backgroundColor: TITLE_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = <NavigationBar
      title='最热'
      style={statusBar}
      style={{ backgroundColor: TITLE_COLOR, }}
    />
    const TabNavigator = this._tabNavigator()
    return (
      <View style={{ flex: 1, marginTop: 0 }}>
        {navigationBar}
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

  loadData = (loadMore) => {
    const { onRefreshPopular, onLoadMorePopular } = this.props
    const store = this._store()
    const url = this.genFetchUrl(this.storeName)
    if (loadMore) {
      onLoadMorePopular(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, favoriteDao, () => {
        this.refs.toast.show('没有更多了')
      })
    } else {
      onRefreshPopular(this.storeName, url, PAGE_SIZE, favoriteDao)
    }
  }

  _store = () => {
    const { popular } = this.props
    let store = popular[this.storeName] // 动态获取state
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
    return URL + key + QUERY_STR
  }

  renderItem = ({ item }) => {
    return (
      <PopularItem
        projectModel={item}
        onSelect={() => {
          console.log("popularitem Press")
          NavigationUtil.goPage({
            projectModel: item
          }, 'DetailPage')
        }}
        onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite,FLAG_STORAGE.flag_popular)}
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
    console.log("popularpage: store.projectModes", store.projectModes)
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={this.renderItem}
          keyExtractor={item => '' + item.item.id}
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
    popular: state.popular
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRefreshPopular: (storeName, url, pageSize,favoriteDao) =>
      dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, favoriteDao,callBack) => (
      dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, favoriteDao, callBack))
    )
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
    margin: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  tabStyle: {
    // minWidth: 50// minWidth会导致tabStyle初次加载的时候会有闪烁
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
      height: 30 // minWidth会导致tabStyle初次加载的时候会有闪烁
    },
    indicatorStyle: styles.indicatorStyle,
    labelStyle: styles.labelStyle
  }
}
