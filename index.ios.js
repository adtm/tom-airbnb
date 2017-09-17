import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      screen: 'example.FirstTabScreen', // this is a registered name for a screen
      title: 'Calendar',
    }
  ], tabsStyle: { // optional, **iOS Only** add this if you want to style the tab bar beyond the defaults
    // tabBarHidden: true, // make the tab bar hidden
    tabBarTranslucent: true
  }
});

