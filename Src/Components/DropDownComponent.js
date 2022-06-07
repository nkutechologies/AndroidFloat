import React, { Component, useState, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import Theme from '../Utils/Theme';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useLinkProps } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalDropdown from 'react-native-modal-dropdown';
const DropDownComponent = (props) => {
    const dropdown = useRef(null);
    return (
        <View style={{ borderBottomWidth: 0.3, paddingBottom: Theme.screenHeight / 80 }}>
            <Text style={{
                color: Theme.black, marginVertical: Theme.screenHeight / 90,
                fontSize: Theme.screenHeight / 50, fontWeight: 'bold'
            }}>{props.Title}</Text>
            <View
                style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // borderRadius: 10,
                    justifyContent: 'space-between',
                    paddingHorizontal: Theme.screenWidth / 90
                }}>
                <ModalDropdown
                    ref={dropdown}
                    options={props.options}
                    defaultValue={props.defaultValue}
                    defaultTextStyle={{color:'grey'}}
                    dropdownStyle={props.dropdownStyle}
                    style={props.dropDownContainerStyle}
                    textStyle={{ color: Theme.black,fontSize:Theme.screenHeight/60 }}
                    dropdownTextStyle={{fontSize:Theme.screenHeight/50,paddingHorizontal:20}}
                    dropdownTextHighlightStyle={{color:Theme.blue}}
                    animated={true}
                    showsVerticalScrollIndicator={false}
                    
                    // onSelect={(index, value) => props.onSelect(index, value)}
                />
                <TouchableOpacity onPress={() => dropdown.current.show()}>
                    <Icon
                        name={'chevron-down'}
                        type={'feather'}
                    />
                </TouchableOpacity>


            </View>
        </View>
    );
};
export default DropDownComponent;