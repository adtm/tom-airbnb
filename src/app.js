import { Navigation } from "react-native-navigation";

import { registerScreens } from "./screens";
import { Platform } from "react-native";

registerScreens();

const tabs = [
  {
    label: "Calendar",
    screen: "tombnb.MainCalendarScreen",
    icon: require("../img/collaboration.png"),
    title: "Calendar"
  },
  {
    label: "New Booking",
    screen: "tombnb.NewBookingScreen",
    icon: require("../img/plus.png"),
    title: "New Booking"
  },
  {
    label: "Analytics",
    screen: "tombnb.AnalyticsScreen",
    icon: require("../img/line_chart.png"),
    title: "Analytics"
  }
];

Navigation.startTabBasedApp({
  tabs
});
