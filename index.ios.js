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
  ]
});

