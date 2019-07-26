/**
 * @format
 */

import React, { AppRegistry, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { name as appName } from './app.json'
import App from './js/App.js'

AppRegistry.registerComponent(appName, () => App)
