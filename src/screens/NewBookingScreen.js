import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import List from 'antd-mobile/lib/list';
import TextareaItem from 'antd-mobile/lib/textarea-item';
import Button from 'antd-mobile/lib/button';
import DatePicker from 'antd-mobile/lib/date-picker';
import moment from 'moment'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import axios from 'axios';
import { connect } from 'react-redux';
import * as appActions from '../reducers/app/actions';


class NewBookingScreen extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Back', // for a textual button, provide the button title (label)
        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'back') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.pop({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
      }
    }
  }

  onSubmit = (name, surname, selectionDate, selectionTime) => {
    axios.post('http://localhost:3000/api/bookings/create', {
      bookerName: name,
      bookerSurname: surname,
      bookerTime: selectionTime,
      date: selectionDate
    }).then(savedBookings => {
      this.props.createBooking(savedBookings);
      this.props.navigator.pop({
        animationType: 'slide-down',
      });
    }).catch(e => console.log(e))
  }
  
  render() {
    return (
      <View >
        <List renderHeader={() => 'Person information'}>
          <TextareaItem
            placeholder="Name"
            value={this.props.name}
            clear
            focused={this.state.focused}
            onFocus={() => {
              this.setState({
                focused: false,
              });
            }}
            onChange={name => this.props.setName(name)}
          />
          <TextareaItem
            placeholder="Surname"
            value={this.props.surname}
            onChange={surname => this.props.setSurname(surname)}
            clear
          />
        </List>
        <List renderHeader={() => 'Booking information'}>
          <DatePicker
            mode="date"
            format={val => val.format('YYYY-MM-DD')}
            okText="OK"
            dismissText="Cancel"
            onChange={day => this.props.setDate(day)}
            locale={enUs}
            value={moment(this.props.selectionDate, 'YYYY-MM-DD')}
            maxDate={moment(this.props.lastDay, 'YYYY-MM-DD')}
            minDate={moment(this.props.today, 'YYYY-MM-DD')}
          ><List.Item arrow="horizontal">Book Date</List.Item>
          </DatePicker>
          <DatePicker
            mode="time"
            format={val => val.format('HH:mm')}
            okText="OK"
            dismissText="Cancel"
            locale={enUs}
            value={moment(this.props.selectionTime, 'HH:mm')}
            onChange={selectedTime => this.props.setTime(selectedTime)}
          >
            <List.Item arrow="horizontal">Book Time</List.Item>
          </DatePicker>
        </List>
        <Button style={{ margin: 10 }} type="primary" onClick={() => this.onSubmit(this.props.name,
          this.props.surname,
          this.props.selectionDate,
          this.props.selectionTime)}>Book</Button>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    today: state.app.today,
    lastDay: state.app.lastDay,
    selectionDate: state.app.selectionDate,
    selectionTime: state.app.selectionTime,
    name: state.app.name,
    surname: state.app.surname,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: name => dispatch(appActions.setName(name)),
    setSurname: surname => dispatch(appActions.setSurname(surname)),
    setTime: time => dispatch(appActions.setSelectionTime(moment(time).format("HH:mm"))),
    setDate: date => dispatch(appActions.setSelectionDate(moment(date).format("YYYY-MM-DD"))),
    createBooking: data => dispatch(appActions.createBooking(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBookingScreen);