import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './FirstTabScreen';
import ModalScreen from './ModalScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.ModalScreen', () => ModalScreen);
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
}