import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      screen: 'tombnb.MainCalendarScreen', // this is a registered name for a screen
      title: 'Calendar',
    }
  ], tabStyle: {
    tabBarHidden: true
  }
});

