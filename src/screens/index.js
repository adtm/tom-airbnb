import { Navigation } from 'react-native-navigation';

import MainCalendarScreen from './MainCalendarScreen';
import NewBookingScreen from './NewBookingScreen';
import RequestScreen from './RequestScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('tombnb.NewBookingScreen', () => NewBookingScreen, store, Provider);
  Navigation.registerComponent('tombnb.RequestScreen', () => RequestScreen, store, Provider);
  Navigation.registerComponent('tombnb.MainCalendarScreen', () => MainCalendarScreen, store, Provider);
}