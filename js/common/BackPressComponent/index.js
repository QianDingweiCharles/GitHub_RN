import { BackHandler } from 'react-native'

// 处理物理返回键
export default class BackPressComponent {
  constructor (props) {
    this._hardwareBackPress = this.onHardwareBackPress.bind(this)
  }

  componentDidMount () {
    if (this.props.backPress) {
      BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress)
    }
  }

  componentWillUnmount () {
    if (this.props.backPress) {
      BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackPress)
    }
  }

  onHardwareBackPress (e) {
    return this.props.backPress(e)
  }
}
