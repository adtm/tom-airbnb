import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Button from 'antd-mobile/lib/button';
import List from 'antd-mobile/lib/list'; 
import Switch from 'antd-mobile/lib/switch'; 

import { connect } from 'react-redux';
import axios from 'axios'

import DateTimeView from '../components/date_time_view'
import PersonInformation from '../components/person_information';
import RequestList from '../components/request_list';
import moment from 'moment'
import * as AddCalendarEvent from 'react-native-add-calendar-event';

class NewBookingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      notes: '',
      checked: true,
      data: []
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() { 
      axios
        .get('https://tombnb-server.herokuapp.com/api/request')
        .then(response => this.setState({ switches: response.data }))
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
    leftButtons: [{
        title: 'Back', // for a textual button, provide the button title (label)
        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
      }]
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
 

  onSubmit = () => {
    // this.props.handleSubmit(
    //   this.state.name, 
    //   this.state.surname, 
    //   this.props.selectionDate, 
    //   this.props.selectionTime,
    // this.state.switches) 
  }

  utcDateToLocalString = (momentInUTC) => {
    return moment(momentInUTC).local().format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
  };

  addToCalendar = (title, startDateUTC) => {
    const eventConfig = {
      title: 'Lunch',
      startDate: this.utcDateToLocalString(moment.utc()),
      endDate: this.utcDateToLocalString(moment.utc(moment.utc()).add(1, 'hours')),
    };

    AddCalendarEvent.presentNewCalendarEventDialog(eventConfig)
      .then(eventId => {
        //handle success (receives event id) or dismissing the modal (receives false)
        if (eventId) {
          console.warn(eventId);
        } else {
          console.warn('dismissed');
        }
      })
      .catch((error) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  }; 

  changeChecked = checked => { this.setState({ checked}) };

  notesChanged = notes => { this.setState({ notes })}

  requestPage = () => {
    this.props.navigator.push({
      screen: "tombnb.RequestScreen", // unique ID registered with Navigation.registerScreen
      title: "Request List", // title of the screen as appears in the nav bar (optional)
      passProps: {
        data: this.state.switches,
        changeSwitch: this.changeSwitch
      }, // simple serializable object that will pass as props to the modal (optional)
      navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
      animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    });
  }

  render() {
    return (
      <ScrollView>
        <PersonInformation 
          name={this.state.name}
          surname={this.state.surname}
          setName={(name) => this.setState({ name })}          // change to one
          setSurname={(surname) => this.setState({ surname })} // change to one
        />

        <DateTimeView
          selectionDate={this.props.selectionDate}
          selectionTime={this.props.selectionTime}
        />

        <Button onClick={() => this.requestPage()}>Requests</Button>

        <RequestList
            checked={this.state.checked}
            changeChecked={this.changeChecked}
            notes={this.state.notes}
            notesChange={this.notesChanged}
        />


        
        


        <Button
          style={{ margin: 10 }}
          type={this.props.error ? "warning" : "primary"}
          onClick={this.addToCalendar}>
          {this.props.error ? this.props.error : "Book"}</Button>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  selectionDate: state.app.selectionDate,
  selectionTime: state.app.selectionTime,
  error: state.app.error
})

export default connect(mapStateToProps, null)(NewBookingScreen);