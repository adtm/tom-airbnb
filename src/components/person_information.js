import React, { Component } from "react";
import List from 'antd-mobile/lib/list';
import TextareaItem from 'antd-mobile/lib/textarea-item';

export default class PersonInformation extends Component {
  render() {
    return (
      <List renderHeader={() => "Person information"}>
        <TextareaItem
          placeholder="Name"
          value={this.props.name}
          onChange={this.props.setName}
          clear
        />
        <TextareaItem
          placeholder="Surname"
          value={this.props.surname}
          onChange={this.props.setSurname}
          clear
        />
      </List>
    );
  }
}
