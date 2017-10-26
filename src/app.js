import { Navigation } from "react-native-navigation";

import { registerScreens } from "./screens";
import { Platform } from "react-native";

registerScreens(); // this is where you register all of your app's screens

Navigation.startTabBasedApp({
  tabs: [
    {
      label: "Calendar",
      screen: "tombnb.MainCalendarScreen", // this is a registered name for a screen
      title: "Calendar"
    }
  ]
});
