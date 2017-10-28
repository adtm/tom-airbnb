import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";

export default class AnalyticsScreen extends Component {
  daysTillMildaSays = () => {
    return Math.abs(moment().diff(moment("2018-09-01"), "days"));
  };

  daysTillTomSays = () => {
    return Math.abs(moment().diff(moment("2019-01-01"), "days"));
  };

  render() {
    return (
      <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ padding: 20 }}>Milda says there are {this.daysTillMildaSays()} days lefts</Text>
        <Text style={{ padding: 20 }}>Tom says there are {this.daysTillTomSays()} days lefts</Text>
      </View>
    );
  }
}
