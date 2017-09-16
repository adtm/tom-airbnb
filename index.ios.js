/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class tombnb extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CalendarList
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          markedDates={{
            '2017-09-09': { selected: true },
            '2017-09-19': { marked: true },
            '2017-09-29': { disabled: true }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1
  }
});

AppRegistry.registerComponent('tombnb', () => tombnb);
