import React, { Component } from 'react';
import { Text, View } from 'react-native';

import CalendarView from '../components/calendar_view'

export default class FirstTabScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <CalendarView/>
      </View>
    )
  }
}