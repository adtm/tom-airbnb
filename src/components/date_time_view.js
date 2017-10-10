import React, { Component } from "react";

import moment from 'moment'
import { connect } from 'react-redux';
import * as actions from '../reducers/app/actions';

import List from "antd-mobile/lib/list";
import TextareaItem from "antd-mobile/lib/textarea-item";
import DatePicker from "antd-mobile/lib/date-picker";
import enUs from "antd-mobile/lib/date-picker/locale/en_US";

class DateTimeView extends Component {
  render() {
    return (
      <List renderHeader={() => "Booking information"}>
        <DatePicker
          mode="date"
          format={val => val.format("YYYY-MM-DD")}
          okText="OK"
          dismissText="Cancel"
          onChange={day => this.props.setDate(day)}
          locale={enUs}
          value={moment(this.props.selectionDate, "YYYY-MM-DD")}
          maxDate={moment(this.props.lastDay, "YYYY-MM-DD")}
          minDate={moment(this.props.today, "YYYY-MM-DD")}
        >
          <List.Item arrow="horizontal">Book Date</List.Item>
        </DatePicker>
        <DatePicker
          mode="time"
          format={val => val.format("HH:mm")}
          okText="OK"
          dismissText="Cancel"
          locale={enUs}
          value={moment(this.props.selectionTime, "HH:mm")}
          onChange={selectedTime => this.props.setTime(selectedTime)}
        >
          <List.Item arrow="horizontal">Book Time</List.Item>
        </DatePicker>
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    today: state.app.today,
    lastDay: state.app.lastDay,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTime: time => dispatch(actions.setSelectionTime(moment(time).format("HH:mm"))),
    setDate: date => dispatch(actions.setSelectionDate(moment(date).format("YYYY-MM-DD"))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateTimeView);