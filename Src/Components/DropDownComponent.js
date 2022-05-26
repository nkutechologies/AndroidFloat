import React, { Component,useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import Theme from '../Utils/Theme';
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useLinkProps } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
const DropDownComponent = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(['italy', 'spain', 'barcelona', 'finland']);
    const [items, setItems] = useState([
      {label: 'Spain', value: 'spain'},
      {label: 'Madrid', value: 'madrid', parent: 'spain'},
      {label: 'Barcelona', value: 'barcelona', parent: 'spain'},
  
      {label: 'Italy', value: 'italy'},
      {label: 'Rome', value: 'rome', parent: 'italy'},
  
      {label: 'Finland', value: 'finland'}
    ]);
  return (
    <View style={{borderBottomWidth:0.3}}>
      <Text style={{color:Theme.black,marginTop:Theme.screenHeight/90,
    fontSize:Theme.screenHeight/50,fontWeight:'bold'}}>{props.Title}</Text>
    <View
      style={{
        backgroundColor: '#fff',
        flexDirection: 'row',
        // elevation: 5,
        // justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        // paddingLeft: 4,
      }}>
     <DropDownPicker
        open={props.Iconopen}
        value={props.value}
        items={props.items}
        setOpen={props.setOpen}
        setValue={props.setValue}
        setItems={props.setItems}

       
      />
   
     
    </View>
    </View>
  );
};
export default DropDownComponent;