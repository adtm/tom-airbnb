import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../reducers/app/actions';
import { View } from 'react-native';
import CalendarView from '../components/calendar_view';
import moment from 'moment';

class MainCalendarScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookings: {}
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Add', // for a textual button, provide the button title (label)
        id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
      }
    ]
  };

  componentDidMount() {
    this.getBookings();
  }

  getBookings() {
    this.props.fetchBookings()
    .then(() => {
      let bookings = {};
      this.props.bookings.map(booking => {
        const strTime = moment(booking.date).format('YYYY-MM-DD');
        if (!this.props.bookings[strTime]) {
          bookings[strTime] = [];
          booking.bookings.map(oneBooking => {
            bookings[strTime].push({
              name: oneBooking.bookerName,
              surname: oneBooking.bookerSurname,
              time: oneBooking.bookerTime,
            });
          })
        }
      });
      this.setState({ bookings });
    });
  }

  /**
   * PR waiting about tabs not hiding
   */
  componentWillMount() {
    this.props.navigator.toggleTabs({
      tabBarHidden: true,
      to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
      animated: false, // does the toggle have transition animation or does it happen immediately (optional)
      drawUnderTabBar: true
    });
  }

  
  handleSubmit = (name, surname, selectionDate, selectionTime) => {
    this.props.createBooking(
      name, surname, selectionTime, selectionDate
    ).then(response => {
      this.props.postBooking(response);
      this.getBookings();
      this.props.navigator.pop({ animationType: 'slide-down' });
    }).catch(err => console.log(err));
  }
  

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'add') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.push({
          screen: "tombnb.NewBookingScreen", // unique ID registered with Navigation.registerScreen
          title: "New Booking", // title of the screen as appears in the nav bar (optional)
          passProps: {
            handleSubmit: this.handleSubmit
          }, // simple serializable object that will pass as props to the modal (optional)
          navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
          animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
        });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CalendarView
          bookings={this.state.bookings}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    bookings: state.app.bookings
  }
}

export default connect(
  mapStateToProps, 
  { ...actions }
)(MainCalendarScreen);
