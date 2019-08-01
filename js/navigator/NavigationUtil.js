export default class NavigationUtil {
  // 跳转到指定页面
  static goPage (params, page) {
    const navigation = NavigationUtil.navigation
    if (!navigation) {
      console.log('NavigationUtil.navigation cannot be null')
      return
    }
    navigation.navigate(page, { ...params })
  }

  // 返回上一个页面
  static goBack (navigation) {
    navigation.goBack()
  }

  // 跳转到主页
  static resetToHomePage (params) {
    const { navigation } = params
    navigation.navigate('Main')
  }
}
