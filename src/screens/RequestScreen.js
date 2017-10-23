import React, { Component } from "react";
import { ScrollView } from "react-native";
import { List, ActivityIndicator, Switch } from "antd-mobile";

export default class RequestScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  render() {
    return (
      <ScrollView>
        {this.props.data ? (
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
          </List>
        ) : (
          <ActivityIndicator animating />
        )}
      </ScrollView>
    );
  }
}
