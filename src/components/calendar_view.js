import React, { Component } from 'react';
import axios from 'axios';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';


export default class CalendarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={this.props.selection}
        maxDate={this.props.lastDay}
        onDayPress={this.props.onDaySelect}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
      />
    );
  }

  renderItem = (item) => {
    console.log(item);
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  loadItems = (day) => {
    axios.get('http://localhost:3000/api/bookings/get')
      .then(foundBookings => {
        const { data } = foundBookings;
        data.map(booking => {
          const strTime = booking.date;
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            booking.bookings.map(oneBooking => {
              this.state.items[strTime].push({
                name: 'Item for ' + oneBooking.bookerName,
                height: Math.max(50, Math.floor(Math.random() * 150))
              });
            })
          }
        })
      })
      .catch(e => console.log(e))
    const newItems = {};
    Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
    this.setState({
      items: newItems
    });
  }

  renderItem = (item) => {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});