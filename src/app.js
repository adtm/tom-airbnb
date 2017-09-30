import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";

import thunk from "redux-thunk";
import { registerScreens } from './screens';

import * as reducers from "./reducers";
import * as appActions from "./reducers/app/actions";
import { Platform } from "react-native";

// redux related book keeping
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

registerScreens(store, Provider); // this is where you register all of your app's screens

export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
  }

  onStoreUpdate() {
    const {root} = store.getState().app;
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }
  
  startApp(root) {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'tombnb.MainCalendarScreen', // this is a registered name for a screen
          title: 'Calendar',
        }
      ], tabStyle: {
        tabBarHidden: true
      }, passProps: {
        str: 'this is a prop'
      }
    });
  }
}
