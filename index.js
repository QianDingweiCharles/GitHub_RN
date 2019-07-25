/**
 * @format
 */

import React, { AppRegistry, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import AppContainer from './js/navigator/AppNavigator'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => AppContainer)
