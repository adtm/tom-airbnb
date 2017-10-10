import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import List from 'antd-mobile/lib/list';
import TextareaItem from 'antd-mobile/lib/textarea-item';
import Button from 'antd-mobile/lib/button';
import DatePicker from 'antd-mobile/lib/date-picker';
import moment from 'moment'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import { connect } from 'react-redux';
import * as actions from '../reducers/app/actions';

import RequestList from '../components/request_list';

class NewBookingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      switches: [
         { name: 'MC drive-through', checked: false },
         { name: 'Night Drive', checked: false },
         { name: 'Perfume', checked: false },
         { name: 'Car delivery', checked: false },
         { name: 'Food deliver', checked: false },
         { name: 'Movie night', checked: false },
         { name: 'Sleepover', checked: false },
         { name: 'Cooking', checked: false },
      ]
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  changeSwitch = (item) => {
    let stateCopy = this.state.switches;
    for (var i in stateCopy) {
      if (stateCopy[i].name === item.name) {
         stateCopy[i].checked = !stateCopy[i].checked;
         this.setState({ switches: stateCopy });
         break; //Stop this loop, we found it!
      }
    };
  }


  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Back', // for a textual button, provide the button title (label)
        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
      }
    ]
  };
  
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
    this.props.handleSubmit(name, surname, selectionTime, selectionDate)
  }

  render() {
    return (
      <ScrollView>
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
        <RequestList
            data={this.state.switches}
            changeSwitch={this.changeSwitch}
        />
        <Button
          style={{ margin: 10 }}
          type={this.props.error ? "warning" : "primary"}
          onClick={() => this.onSubmit(this.props.name,
            this.props.surname,
            this.props.selectionTime,
            this.props.selectionDate)}>
          {this.props.error ? this.props.error : "Book"}</Button>
      </ScrollView>
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
    error: state.app.error
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: name => dispatch(actions.setName(name)),
    setSurname: surname => dispatch(actions.setSurname(surname)),
    setTime: time => dispatch(actions.setSelectionTime(moment(time).format("HH:mm"))),
    setDate: date => dispatch(actions.setSelectionDate(moment(date).format("YYYY-MM-DD"))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBookingScreen);