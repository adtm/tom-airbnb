import React, { Component } from "react";
import List from "antd-mobile/lib/list";
import { ScrollView } from "react-native";
import Switch from 'antd-mobile/lib/switch'
import TextareaItem from 'antd-mobile/lib/textarea-item';

export default class RequestList extends Component {
  
  render() {
    return (
      <ScrollView>
        {this.props.data ? 
        <List renderHeader={() => "Requests"}>
        {this.props.data.map((item, index) => {
          return (
            <List.Item
              key={`${index}+i`}
              extra={
                <Switch
                  checked={item.checked}
                  onChange={checked => {
                    this.props.changeSwitch(item);
                  }}
                />
              }
            >
              {item.name}
            </List.Item>
          );
        })}
      </List> : null}
      <List renderHeader={() => "Notes"}>
        <TextareaItem rows={5} count={100} />
      </List>
      </ScrollView>
    );
  }
}