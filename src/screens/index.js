import { Navigation } from 'react-native-navigation';

import MainCalendarScreen from './MainCalendarScreen';
import NewBookingScreen from './NewBookingScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('tombnb.NewBookingScreen', () => NewBookingScreen, store, Provider);
  Navigation.registerComponent('tombnb.MainCalendarScreen', () => MainCalendarScreen, store, Provider);
}