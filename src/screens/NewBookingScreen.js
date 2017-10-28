import React, { Component } from "react";

import { connect } from 'react-redux';
import * as actions from '../actions/actions';

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
  DatePicker,
  Modal
} from "antd-mobile";
import enUs from "antd-mobile/lib/date-picker/locale/en_US";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import moment from "moment";

class NewBookingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      loading: false,
      modal: false,
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

  addToCalendar = values => {
    AddCalendarEvent.presentNewCalendarEventDialog({
      title: "Tombnb Booking",
      startDate: moment(
        moment(values.day, "YYYY-MM-DD").format("YYYY-MM-DD") +
          moment(values.time, "HH:mm").format("HH:mm"),
        "YYYY-MM-DD HH:mm:ss.SSSZZZ"
      ),
      notes: values.notes
    });
  };

  onSubmit = () => {
    const { getFieldsValue, validateFields } = this.props.form;
    validateFields({ force: true }, error => {
      if (!error) {
        if (this.state.checked) {
          this.addToCalendar(getFieldsValue());
        }
        this.setState({ loading: true });
        console.log(getFieldsValue());
        const requests = {
          
        };
        axios.post('https://tombnb-server.herokuapp.com/api/bookings/create', {
          bookerName: getFieldsValue().name,
          bookerSurname: getFieldsValue().surname,
          bookerTime: getFieldsValue().time,
          date: getFieldsValue().day,
          requests: [
            { name: "perfume", checked: getFieldsValue().Perfume },
            { name: "cooking", checked: getFieldsValue().Cooking },
            { name: "sleepover", checked: getFieldsValue().Sleepover },
            { name: "night-drive", checked: getFieldsValue()["Night Drive"] },
            { name: "mc-drive", checked: getFieldsValue()["MC drive-through"] },
            { name: "movie-night", checked: getFieldsValue()["Movie night"] },
            { name: "car-delivery", checked: getFieldsValue()["Car delivery"] },
            { name: "food-delivery", checked: getFieldsValue()["Food deliver"] },
          ]
        }).then(() => {
          this.setState({ loading: false });
          alert("Booking created Milda! :)");          
        })
        .catch((error) => {
          alert('There was an error!');
        })
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
            minDate={moment()}
            maxDate={moment().add(2, "weeks")}
            {...getFieldProps("day", {
              initialValue: moment(this.props.selectedDay)
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
                          {...getFieldProps(`${item.name}`, {
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
            {...getFieldProps("notes", {
                  initialValue: '',
                })}
            rows={5}
            count={100}
          />
          <List.Item
            extra={
              <Switch
                checked={this.state.checked}
                onChange={(checked) => this.setState({ checked })}
              />
            }
          >
            Save to iCalendar
          </List.Item>
        </List>
        <Button
          style={{ margin: 10 }}
          type="primary"
          onClick={this.onSubmit}
          loading={this.state.loading}>
            Book
        </Button>
      </ScrollView>
    );
  }
}

export default connect((state) => {
  return {
    selectedDay: state.default.selectedDay,
  };
})(createForm({
  mapPropsToFields(props) {
    return {
      selectedDay: props.selectedDay,
    };
  },
  onFieldsChange(props, fields) {
    props.dispatch({
      type: 'UPDATE_SELECTED_DAY',
      payload: fields.name,
    });
  },
})(NewBookingScreen));