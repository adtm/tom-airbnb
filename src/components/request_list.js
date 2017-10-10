import React, { Component } from "react";
import List from "antd-mobile/lib/list";
import { ScrollView } from "react-native";
import Switch from 'antd-mobile/lib/switch'
import TextareaItem from 'antd-mobile/lib/textarea-item';

export default class RequestList extends Component {

  render() {
    return (
      <ScrollView>
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

        <List renderHeader={() => "Notes"}>
          <TextareaItem rows={5} count={100} />
        </List>
      </ScrollView>
    );
  }
}

// <List renderHeader={() => "Requests"}>
// <List.Item
//   extra={
//     <Switch
//       checked={false}
//       onClick={checked => {
//         console.log(checked);
//       }}
//     />
//   }
// >
//   MC drive-through{" "}
// </List.Item>
//           <List.Item
//             extra={
//               <Switch
//                 checked={false}
//                 onClick={checked => {
//                   console.log(checked);
//                 }}
//               />
//             }
//           >
//             Night drive{" "}
//           </List.Item>
//           <List.Item
//             extra={
//               <Switch
//                 checked={false}
//                 onClick={checked => {
//                   console.log(checked);
//                 }}
//               />
//             }
//           >
//             Leave a perfumed item{" "}
//           </List.Item>
//           <List.Item
//             extra={
//               <Switch
//                 checked={false}
//                 onClick={checked => {
//                   console.log(checked);
//                 }}
//               />
//             }
//           >
//             Car pickup{" "}
//           </List.Item>
//           <List.Item
//             extra={
//               <Switch
//                 checked={false}
//                 onClick={checked => {
//                   console.log(checked);
//                 }}
//               />
//             }
//           >
//             Food delivery when ill
//           </List.Item>
//           <List.Item
//             extra={
//               <Switch
//                 checked={false}
//                 onClick={checked => {
//                   console.log(checked);
//                 }}
//               />
//             }
//           >
//             Go to restaurant
//           </List.Item>
//           <List.Item
//             extra={
//               <Switch
//                 checked={false}
//                 onClick={checked => {
//                   console.log(checked);
//                 }}
//               />
//             }
//           >
//             Movie date
//           </List.Item>
//           <List.Item
//             extra={
//               <Switch
//                 checked={false}
//                 onClick={checked => {
//                   console.log(checked);
//                 }}
//               />
//             }
//           >
//             Sleepover
//           </List.Item>
//           <List.Item
//             extra={
//               <Switch
//                 checked={false}
//                 onClick={checked => {
//                   console.log(checked);
//                 }}
//               />
//             }
//           >
//             Cooking
//           </List.Item>
//         </List>
