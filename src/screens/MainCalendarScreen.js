import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../reducers/app/actions";
import { View, StyleSheet, Text } from "react-native";
import CalendarView from "../components/calendar_view";
import { Agenda } from "react-native-calendars";
import moment from "moment";

class MainCalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: {},
      day: moment().format("YYYY-MM-DD")
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.getBookings();
  }

  getBookings() {
    this.props.fetchBookings().then(() => {
      let bookings = {};
      this.props.bookings.map(booking => {
        const strTime = moment(booking.date).format("YYYY-MM-DD");
        if (!this.props.bookings[strTime]) {
          bookings[strTime] = [];
          booking.bookings.map(oneBooking => {
            bookings[strTime].push({
              name: oneBooking.bookerName,
              surname: oneBooking.bookerSurname,
              time: oneBooking.bookerTime,
              requests: oneBooking.requests
            });
          });
        }
      });
      this.setState({ bookings });
    });
  }

  static navigatorButtons = {
    rightButtons: [
      {
        title: "Add", // for a textual button, provide the button title (label)
        id: "add", // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: "e2e_rules", // optional, used to locate this view in end-to-end tests
        disableIconTint: true // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
      }
    ]
  };

  /**
   * PR waiting about tabs not hiding
   */
  componentWillMount() {
    this.props.navigator.toggleTabs({
      tabBarHidden: true,
      to: "hidden", // required, 'hidden' = hide tab bar, 'shown' = show tab bar
      animated: false, // does the toggle have transition animation or does it happen immediately (optional)
      drawUnderTabBar: true
    });
  }

  handleSubmit = (name, surname, selectionDate, selectionTime, requests) => {
    this.props
      .createBooking(name, surname, selectionTime, selectionDate, requests)
      .then(status => {
        if (status) {
          this.getBookings();
          this.props.navigator.pop({ animationType: "slide-down" });
        }
      });
  };

  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "add") {
        this.props.navigator.push({
          screen: "tombnb.NewBookingScreen",
          title: "New Booking",
          passProps: {
            handleSubmit: this.handleSubmit,
            day: this.state.day
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
          selected={this.state.selection}
          maxDate={moment()
            .add(2, "weeks")
            .format("YYYY-MM-DD")}
          onDayPress={day =>
            this.setState({ day: moment(day).format("YYYY-MM-DD") })}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
        />
      </View>
    );
  }

  renderRequests = requests => {
    if (requests) {
      return requests.map(request => {
        if (request.checked) {
          return <Text>{request.name}</Text>;
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

const mapStateToProps = state => {
  return {
    bookings: state.app.bookings
  };
};

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

export default connect(mapStateToProps, { ...actions })(MainCalendarScreen);
