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
  InputItem
} from "antd-mobile";

import DateTimeView from "../components/date_time_view";
import PersonInformation from "../components/person_information";
import RequestList from "../components/request_list";
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
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    axios.get("https://tombnb-server.herokuapp.com/api/request")
      .then(response => {
        this.setState({ switches: response.data })
      });
  }

  // changeSwitch = item => {
  //   let stateCopy = this.state.switches;
  //   for (var i in stateCopy) {
  //     if (stateCopy[i].name === item.name) {
  //       stateCopy[i].checked = !stateCopy[i].checked;
  //       this.setState({ switches: stateCopy });
  //       break; //Stop this loop, we found it!
  //     }
  //   }
  // };

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
                          onChange={checked => {
                            this.changeSwitch(item);
                          }}
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

        {/* 
        <DateTimeView
          selectionDate={this.props.selectionDate}
          selectionTime={this.props.selectionTime}
        />

        <Accordion accordion openAnimation={{}}>
          <Accordion.Panel header="Request List">
            <List>
              {this.state.switches.map((item, index) => {
                return (
                  <List.Item
                    key={`${index}+i`}
                    extra={
                      <Switch
                        checked={item.checked}
                        onChange={checked => {
                          this.changeSwitch(item);
                        }}
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

        <View>
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
        </View> */}

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

const mapStateToProps = state => ({
  selectionDate: state.app.selectionDate,
  selectionTime: state.app.selectionTime,
  error: state.app.error
});

export default createForm()(NewBookingScreen);

// export default connect((state) => {
//   return {
//     selectionDate: state.app.selectionDate,
//     selectionTime: state.app.selectionTime,
//     error: state.app.error
//   }
// })(createForm({
//   mapPropsToFields(props) {
//     console.log('mapPropsToFields', props);
//     return {
//       // selectionDate: props.formState.selectionDate,
//       // selectionTime: props.formState.selectionTime,
//     };
//   },
//   onFieldsChange(props, fields) {
//     console.log('onFieldsChange', fields);
//     props.dispatch({
//       type: 'save_fields',
//       payload: fields,
//     });
//   },
// })(NewBookingScreen));
