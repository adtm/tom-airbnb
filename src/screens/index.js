import { Navigation } from 'react-native-navigation';

import MainCalendarScreen from './MainCalendarScreen';
import NewBookingScreen from './NewBookingScreen';
import AnalyticsScreen from './AnalyticsScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('tombnb.NewBookingScreen', () => NewBookingScreen, store, Provider);
  Navigation.registerComponent('tombnb.MainCalendarScreen', () => MainCalendarScreen, store, Provider);
  Navigation.registerComponent('tombnb.AnalyticsScreen', () => AnalyticsScreen, store, Provider);
}