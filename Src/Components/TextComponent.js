import React, {Component} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import Theme from '../Utils/Theme';
import {Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLinkProps} from '@react-navigation/native';

const TextComponent = props => {
  return (
    <View style={{borderBottomWidth: 1, borderBottomColor: Theme.grey}}>
      <Text
        style={{
          color: Theme.black,
          marginTop: Theme.screenHeight / 90,
          fontSize: Theme.screenHeight / 50,
          fontWeight: 'bold',
        }}>
        {props.Title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <TextInput
          value={props.value}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          style={{
            height: Theme.screenHeight / 17,
            width: Theme.screenWidth / 1,
            fontSize: Theme.screenHeight / 50,
            color: Theme.black,
            borderRadius: 10,
          }}
          placeholder={props.placeholder}
          placeholderTextColor={'grey'}
          onChangeText={props.onChangeText}
        />
        <Icon
          name={props.name}
          type={props.type}
          color="#517fa4"
          size={22}
          onPress={props.iconPress}
          style={{
            padding: 2,
            marginHorizontal: Theme.screenWidth / 6,
            marginRight: Theme.screenWidth / 8,
          }}
        />
        {/* <Ionicons
      onPress={props.iconPress}
        name={props.source}
        size={18}
        color={Theme.black}
        style={{
            padding:2,
            // borderColor:'red',
            // borderWidth:1,
         marginHorizontal:Theme.screenWidth/26
        //   marginRight: Theme.screenWidth/10,
        }}
      /> */}
      </View>
    </View>
  );
};
export default TextComponent;
