import { Navigation } from 'react-native-navigation';

import MainCalendarScreen from './MainCalendarScreen';
import NewBookingScreen from './NewBookingScreen';

export function registerScreens() {
  Navigation.registerComponent('tombnb.NewBookingScreen', () => NewBookingScreen);
  Navigation.registerComponent('tombnb.MainCalendarScreen', () => MainCalendarScreen);
}