import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as appActions from '../reducers/app/actions';
import axios from 'axios';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';

class CalendarView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      more: false
    }
  }

  render() {
    return (
      <Agenda
        items={this.props.bookings}
        selected={this.props.today}
        maxDate={this.props.lastDay}
        onDayPress={this.props.setDay}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
      />
    );
  }

  renderRequests = (requests) => {
    console.log(requests)
    if (requests) {
      return requests.map(request => {
        if (request.checked) {
          return <Text>{request.name}</Text>
        }
      })
    }
  }

  renderItem = (item) => {
    console.log(item)
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>Name: {item.name} {item.surname}</Text>
        <Text>Time: {moment(item.time).format('HH:mm')}</Text>
        <Text>----</Text>
        {this.renderRequests(item.requests)}
      </View>
    );
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged = (r1, r2) => {
    return true;
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 15,
    marginRight: 20,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    today: state.app.today,
    lastDay: state.app.lastDay,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDay: date => dispatch(appActions.setSelectionDate(date.dateString)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
