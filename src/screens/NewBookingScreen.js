import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import List from 'antd-mobile/lib/list';
import TextareaItem from 'antd-mobile/lib/textarea-item';
import Button from 'antd-mobile/lib/button';
import DatePicker from 'antd-mobile/lib/date-picker';
import moment from 'moment'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import { createForm } from 'rc-form';


const gmtNow = moment().utcOffset(0);

const maxDate = moment('2016-12-03', 'YYYY-MM-DD');
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

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

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'back') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      name: '',
      surname: '',
      selection: this.props.selection
    };
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }


  
  render() {
    const { getFieldProps } = this.props.form;
    console.log(this.props);
    return (
      <View >
        <List renderHeader={() => 'Person information'}>
          <TextareaItem
            {...getFieldProps('control') }
            placeholder="Name"
            value={this.state.name}
            clear
            focused={this.state.focused}
            onFocus={() => {
              this.setState({
                focused: false,
              });
            }}
            onChange={name => this.setState({ name })}
          />
          <TextareaItem
            placeholder="Surname"
            value={this.state.surname}
            onChange={surname => this.setState({ surname })}
            clear
          />
        </List>
        <List renderHeader={() => 'Booking information'}>
          <DatePicker
            mode="date"
            format={val => val.format('YYYY-MM-DD')}
            okText="OK"
            dismissText="Cancel"
            onChange={date => console.log(date)}
            locale={enUs}
            {...getFieldProps('customformat', {
              initialValue: moment(this.state.selection, 'YYYY-MM-DD')
            }) }
            maxDate={moment(this.props.lastDay, 'YYYY-MM-DD')}
            minDate={moment(this.props.today, 'YYYY-MM-DD')}
          ><List.Item arrow="horizontal">Book Date</List.Item>
          </DatePicker>
        </List>
        <Button style={{ margin: 10 }} type="primary" onClick={this.props.onSubmit}>Book</Button>
      </View>
    );
  }
}

export default createForm()(NewBookingScreen);