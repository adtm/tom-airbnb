import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  List,
  Switch,
  TextareaItem,
  Button,
  ActivityIndicator
} from 'antd-mobile';

const RequestList = ({ checked, changeChecked, notes, notesChange }) => {
    return (
      <ScrollView>
        <List renderHeader={() => "Additional Information"}>
        <TextareaItem
          value={notes}
          onChange={notesChange}
          rows={5}
          count={100}
        /> 
          <List.Item extra={
            <Switch
              checked={checked}
              onChange={changeChecked} />
          }>Save to iCalendar
          </List.Item> 
      </List>
      </ScrollView>
    );
};

export default RequestList;