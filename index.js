/**
 * @format
 */
import FormData from 'form-data';
FormData.prototype[Symbol.toStringTag] = 'FormData';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
