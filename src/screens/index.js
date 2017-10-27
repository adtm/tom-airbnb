import { Navigation } from 'react-native-navigation';

import MainCalendarScreen from './MainCalendarScreen';
import NewBookingScreen from './NewBookingScreen';
import AnalyticsScreen from './AnalyticsScreen';

export function registerScreens() {
  Navigation.registerComponent('tombnb.NewBookingScreen', () => NewBookingScreen);
  Navigation.registerComponent('tombnb.MainCalendarScreen', () => MainCalendarScreen);
  Navigation.registerComponent('tombnb.AnalyticsScreen', () => AnalyticsScreen);
}