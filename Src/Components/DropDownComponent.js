import React, {Component, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Theme from '../Utils/Theme';
import {Icon} from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
const DropDownComponent = props => {
  const dropdown = useRef(null);
  const itemHeight = Theme.screenHeight / 18;
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: Theme.grey,
        paddingBottom: Theme.screenHeight / 80,
      }}>
      <Text
        style={{
          color: Theme.black,
          marginVertical: Theme.screenHeight / 90,
          fontSize: Theme.screenHeight / 50,
          fontWeight: 'bold',
        }}>
        {props.Title}
      </Text>
      <Pressable
        onPress={() => dropdown.current.show()}
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          alignItems: 'center',
          // borderRadius: 10,
          justifyContent: 'space-between',
          paddingHorizontal: Theme.screenWidth / 90,
          // backgroundColor:'red'
        }}>
        <ModalDropdown
          ref={dropdown}
          options={props.options}
          defaultValue={props.defaultValue}
          disabled={props.disabled}
          defaultTextStyle={{color: 'grey'}}
          dropdownStyle={[
            props.dropdownStyle,
            {
              maxHeight: itemHeight * props.options.length,
              borderBottomColor: Theme.white,
            },
          ]}
          renderSeparator={() => null}
          style={props.dropDownContainerStyle}
          textStyle={{color: Theme.black, fontSize: Theme.screenHeight / 60}}
          dropdownTextStyle={{
            fontSize: Theme.screenHeight / 50,
            paddingHorizontal: 20,
          }}
          dropdownTextHighlightStyle={{color: Theme.blue}}
          animated={true}
          showsVerticalScrollIndicator={false}
          onSelect={(index, value) => props.onSelect(index, value)}
        />
        <TouchableOpacity onPress={() => dropdown.current.show()}>
          <Icon name={'chevron-down'} type={'feather'} />
        </TouchableOpacity>
      </Pressable>
    </View>
  );
};
export default DropDownComponent;
