import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import List from 'antd-mobile/lib/list';
import TextareaItem from 'antd-mobile/lib/textarea-item';
 
import { createForm } from 'rc-form';

class ModalScreen extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Back', // for a textual button, provide the button title (label)
        id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  };

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'back') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.dismissModal({
          animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <ScrollView>
        <List renderHeader={() => 'Customize to focus'}>
          <TextareaItem
            title="标题"
            placeholder="auto focus in Alipay client"
            data-seed="logId"
            autoFocus
            autoHeight
          />
          <TextareaItem
            title="标题"
            placeholder="click the button below to focus"
            data-seed="logId"
            autoHeight
            focused={this.state.focused}
            onFocus={() => {
              this.setState({
                focused: false,
              });
            }}
          />
        </List>
        <List renderHeader={() => 'Whether is controlled'}>
          <TextareaItem
            {...getFieldProps('control')}
            title="受控组件"
            placeholder="Hello World"
          />
          <TextareaItem
            title="非受控组件"
            placeholder="please input content"
          />
        </List>
        <List renderHeader={() => 'Auto / Fixed height'}>
          <TextareaItem
            {...getFieldProps('note3')}
            title="高度自适应"
            autoHeight
            labelNumber={5}
          />
          <TextareaItem
            {...getFieldProps('note1')}
            rows={3}
            placeholder="fixed number of lines"
          />
        </List>
        <List renderHeader={() => 'Show clear icon'}>
          <TextareaItem
            {...getFieldProps('clear1')}
            clear
            title="标题"
            placeholder="displayed clear icon while typing"
          />
        </List>
        <List renderHeader={() => 'Custom title（text / image / empty）'}>
          <TextareaItem
            {...getFieldProps('title3')}
            title={<img src="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" alt="icon" style={{ width: '0.56rem', height: '0.56rem' }} />}
            placeholder="title can be customized"
          />
        </List>
        <List renderHeader={() => 'Limited value length'}>
          <TextareaItem
            {...getFieldProps('note4')}
            placeholder="can enter up to 10 characters"
            count={10}
          />
        </List>
        <List renderHeader={() => 'Count'}>
          <TextareaItem
            {...getFieldProps('count', {
              initialValue: '计数功能,我的意见是...',
            })}
            rows={5}
            count={100}
          />
        </List>
        <List renderHeader={() => 'Not editable / Disabled'}>
          <TextareaItem
            {...getFieldProps('note6', {
              initialValue: 'not editable',
            })}
            title="姓名"
            editable={false}
          />
          <TextareaItem
            value="disabled style"
            title="姓名"
            disabled
          />
        </List>
      </ScrollView>
    );
  }
}

export default createForm()(ModalScreen);