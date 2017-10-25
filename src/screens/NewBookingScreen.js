import React, { Component } from "react";
import axios from "axios";
import { createForm } from "rc-form";
import { ScrollView, View, Text } from "react-native";
import {
  Accordion,
  Button,
  List,
  Switch,
  TextareaItem,
  InputItem,
  DatePicker
} from "antd-mobile";
import enUs from "antd-mobile/lib/date-picker/locale/en_US";
import moment from "moment";

import * as AddCalendarEvent from "react-native-add-calendar-event";

class NewBookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      checked: true,
      switches: []
    };
  }

  componentDidMount() {
    axios
      .get("https://tombnb-server.herokuapp.com/api/request")
      .then(response => {
        this.setState({ switches: response.data });
      });
  }

  // onSubmit = () => {
  //   // this.props.handleSubmit(
  //   //   this.state.name,
  //   //   this.state.surname,
  //   //   this.props.selectionDate,
  //   //   this.props.selectionTime,
  //   // this.state.switches)
  // };

  // utcDateToLocalString = momentInUTC => {
  //   return moment(momentInUTC)
  //     .local()
  //     .format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
  // };

  // addToCalendar = (title, startDateUTC) => {
  //   const eventConfig = {
  //     title: "Lunch",
  //     startDate: this.utcDateToLocalString(moment.utc()),
  //     endDate: this.utcDateToLocalString(
  //       moment.utc(moment.utc()).add(1, "hours")
  //     )
  //   };

  //   AddCalendarEvent.presentNewCalendarEventDialog(eventConfig)
  //     .then(eventId => {
  //       //handle success (receives event id) or dismissing the modal (receives false)
  //       if (eventId) {
  //         console.warn(eventId);
  //       } else {
  //         console.warn("dismissed");
  //       }
  //     })
  //     .catch(error => {
  //       // handle error such as when user rejected permissions
  //       console.warn(error);
  //     });
  // };

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, error => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      } else {
        alert("Validation failed");
      }
    });
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <ScrollView>
        <List renderHeader={() => "Person information"}>
          <TextareaItem
            {...getFieldProps("name", {
              rules: [{ required: true, message: "Please input your name" }]
            })}
            clear
            error={!!getFieldError("name")}
            onErrorClick={() => {
              alert(getFieldError("name").join("、"));
            }}
            placeholder="Name"
          />
          <TextareaItem
            {...getFieldProps("surname", {
              rules: [{ required: true, message: "Please input your surname" }]
            })}
            clear
            error={!!getFieldError("surname")}
            onErrorClick={() => {
              alert(getFieldError("surname").join("、"));
            }}
            placeholder="Surname"
          />
        </List>

        <List renderHeader={() => "Booking Information"}>
          <DatePicker
            mode="date"
            format={val => val.format("YYYY-MM-DD")}
            okText="OK"
            dismissText="Cancel"
            locale={enUs}
            minDate={moment().format("YYYY-MM-DD")}
            maxDate={moment()
              .add(2, "weeks")
              .format("YYYY-MM-DD")}
            {...getFieldProps("day", {
              initialValue: moment(this.props.day, "YYYY-MM-DD")
            })}
          >
            <List.Item arrow="horizontal">Book Date</List.Item>
          </DatePicker>
          <DatePicker
            mode="time"
            format={val => val.format("HH:mm")}
            okText="OK"
            dismissText="Cancel"
            locale={enUs}
            {...getFieldProps("time", {
              initialValue: moment()
            })}
          >
            <List.Item arrow="horizontal">Book Time</List.Item>
          </DatePicker>
          <Accordion>
            <Accordion.Panel header="Request List">
              <List>
                {this.state.switches.map((item, index) => {
                  return (
                    <List.Item
                      key={`${index}+i`}
                      extra={
                        <Switch
                          checked={item.checked}
                          {...getFieldProps(`switch-${index}`, {
                            initialValue: false,
                            valuePropName: "checked"
                          })}
                        />
                      }
                    >
                      {item.name}
                    </List.Item>
                  );
                })}
              </List>
            </Accordion.Panel>
          </Accordion>
        </List>

        <List renderHeader={() => "Additional Information"}>
          <TextareaItem
            value={this.state.notes}
            onChange={notes => this.setState({ notes })}
            rows={5}
            count={100}
          />
          <List.Item
            extra={
              <Switch
                checked={this.state.checked}
                onChange={checked => this.setState({ checked })}
              />
            }
          >
            Save to iCalendar
          </List.Item>
        </List>
        <Button
          style={{ margin: 10 }}
          type={this.props.error ? "warning" : "primary"}
          onClick={this.onSubmit}
        >
          {this.props.error ? this.props.error : "Book"}
        </Button>
      </ScrollView>
    );
  }
}

export default createForm()(NewBookingScreen);
