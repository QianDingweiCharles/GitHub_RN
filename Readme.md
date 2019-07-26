# 采坑之路 react-navigation2.0 与 3.0 区别

## 文档 https://reactnavigation.org/blog/2018/11/17/react-navigation-3.0.html

## react-native-vector-icons

安装'react-native-vector-icons'之后，要把 node_modules 下的 react-native-vector-icons 目录下的 Fonts 目录下的文件拷贝到 android/app/src/main/assets/fonts 下

## createAppContainer

`createBottomTabNavigator、createMaterialTopTabNavigator` 等只要和 React 相接处，都要用 createAppContainer 包裹一层，写成如下：

```javascript
  _tabNavigator() {
    let tabs = {}
    if (this.props.navigation.state.params) {
      /**
       * 取出上一个页面传过来的要显示的tab参数，也可以是从服务端下发的的Tab的配置，
       * 比如显示createBottomTabNavigator中的那些Tab,
       * 这个配置页可以是在其他页面获取之后通过AsyncStorage写入到本地缓存，
       * 然后在这里读取缓存，也可以通过其他方式如props、global config等获取
       ***/
      this.props.navigation.state.params.tabs.forEach(e => {
        //根据需要定制要显示的tab
        tabs[e] = TABS[e]
      })
    } else {
      const { PopularPage, TrendingPage, FavoritePage, MyPage } = tabsConfig //根据需要定制要显示的tab
      tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
      //Page1.navigationOptions.tabBarLabel = 'P1' //动态修改Tab的属性
    }
    return createAppContainer(createBottomTabNavigator(tabs, TabBarOptions))
  }

  render() {
    const Tabs = this._tabNavigator()
    return <Tabs />
  }
```

### createMaterialTopTabNavigator 的 RouteConfig 传参方式

```javascript
const RouteConfig = {
  PopularTab1: {
    screen: props => <PopularTab {...props} />,
    navigationOptions: {
      title: 'All'
    }
  },
  PopularTab2: {
    screen: props => <PopularTab {...props} />,
    navigationOptions: {
      title: 'IOS'
    }
  },
  PopularTab3: {
    screen: props => <PopularTab {...props} />,
    navigationOptions: {
      tabBarLabel: 'Android'
    }
  },
  PopularTab4: {
    screen: props => <PopularTab {...props} />,
    navigationOptions: {
      tabBarLabel: 'MI'
    }
  }
}
```

## react-navigation-redux-helpers 用法

参考官网： https://github.com/react-navigation/redux-helpers

## 处理物理返回键

```javascript
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }
// 必须用箭头函数
  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.routes[1].index === 0) {
      //如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }
```
