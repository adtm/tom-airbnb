import React, { Component } from "react"; 

import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import { View, StyleSheet, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import axios from "axios";

class MainCalendarScreen extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: "Add",
        id: "add",
        testID: "e2e_rules",
        disableIconTint: true
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      bookings: {},
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    axios.get("https://tombnb-server.herokuapp.com/api/bookings/get").then(bookings => {
      let bookingsRef = {};
      bookings.data.map(booking => {
        const strTime = moment(booking.date).format("YYYY-MM-DD");
        if (!bookings[strTime]) {
          bookingsRef[strTime] = [];
          booking.bookings.map(oneBooking => {
            bookingsRef[strTime].push({
              name: oneBooking.bookerName,
              surname: oneBooking.bookerSurname,
              time: oneBooking.bookerTime,
              requests: oneBooking.requests
            });
          });
        }
      });
      this.setState({ bookings: bookingsRef });
    });
  }

  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "add") {
        this.props.navigator.push({
          screen: "tombnb.NewBookingScreen",
          title: "New Booking",
          passProps: {
            selectedDay: this.props.selectedDay
          },
          navigatorStyle: {},
          animationType: "slide-up"
        });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Agenda
          items={this.state.bookings}
          selected={this.props.selectedDay}
          maxDate={moment()
            .add(2, "weeks")
            .format("YYYY-MM-DD")}
          onDayChange={day =>
            this.props.updateSelectedDay(moment(day).subtract(1, "month"))}
          onDayPress={day =>
            this.props.updateSelectedDay(moment(day).subtract(1, "month"))}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
        />
      </View>
    );
  }

  renderRequests = requests => {
    if (requests) {
      return requests.map((request, index) => {
        if (request.checked) {
          return <Text key={index}>{request.name}</Text>;
        }
      });
    }
  };

  renderItem = item => {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>
          Name: {item.name} {item.surname}
        </Text>
        <Text>Time: {moment(item.time).format("HH:mm")}</Text>
        <Text>----</Text>
        {this.renderRequests(item.requests)}
      </View>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return true;
  };
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 15,
    marginRight: 20,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

const mapStateToProps = state => {
  return {
    selectedDay: state.default.selectedDay
  }
}

export default connect(mapStateToProps, { ...actions })(MainCalendarScreen);