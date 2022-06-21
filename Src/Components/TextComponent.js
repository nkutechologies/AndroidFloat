import React, {Component} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import Theme from '../Utils/Theme';
import {Icon} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useLinkProps} from '@react-navigation/native';

const TextComponent = props => {
  return (
    <View style={{borderBottomWidth: 0.3}}>
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
          // flex:1,
          backgroundColor: '#fff',
          flexDirection: 'row',
          // elevation: 5,
          // justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 10,
          // paddingLeft: 4,
          // backgroundColor:'pink'
        }}>
        <TextInput
          value={props.value}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          style={{
            flex: 1,
            height: Theme.screenHeight / 18,
            // fontSize: Theme.screenHeight / 40,
            // backgroundColor: '#383838',
            // backgroundColor: 'pink',
            // borderWidth: 1,
            // paddingLeft: 50,
            fontSize: Theme.screenHeight / 50,
            color: Theme.black,
            borderRadius: 10,
            //   fontFamily: Theme.fontFamily,
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
