import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Button from 'antd-mobile/lib/button';
 
import { connect } from 'react-redux';
import axios from 'axios'

import DateTimeView from '../components/date_time_view'
import PersonInformation from '../components/person_information';
import RequestList from '../components/request_list';


class NewBookingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() { 
      axios
        .get('http://localhost:3000/api/request')
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
    this.props.handleSubmit(
      this.state.name, 
      this.state.surname, 
      this.props.selectionTime, 
      this.props.selectionDate,
    this.state.switches)
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
        <RequestList
            data={this.state.switches}
            changeSwitch={this.changeSwitch}
        />
        <Button
          style={{ margin: 10 }}
          type={this.props.error ? "warning" : "primary"}
          onClick={this.onSubmit}>
          {this.props.error ? this.props.error : "Book"}</Button>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectionDate: state.app.selectionDate,
    selectionTime: state.app.selectionTime,
    error: state.app.error
  };
}

export default connect(mapStateToProps, null)(NewBookingScreen);