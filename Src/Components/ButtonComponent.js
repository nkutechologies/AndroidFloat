import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Theme from '../Utils/Theme';


const ButtonComponent = ({onPress, text, isGreen, font}) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <View
        style={
          isGreen ? {...styles.btn, backgroundColor: Theme.primary} : styles.btn
        }>
        <Text
          numberOfLines={1}
          style={font ? {...styles.btnText, fontSize: 15} : styles.btnText}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    // justifyContent: 'center',
    borderRadius: 10,
    marginTop: Theme.screenHeight/50,
    alignItems: 'center',
    backgroundColor: Theme.blue,
    paddingVertical: Theme.screenHeight/80,
    // paddingHorizontal: 4,
    // width: '100%',
    alignSelf: 'center',
    // flexDirection: 'row',
  },
  btnText: {
    color: Theme.white,
    fontSize: Theme.screenHeight/40,
    paddingHorizontal:Theme.screenWidth/2.8,
    // fontFamily: Theme.fontFamilySemiBold,
  },
});

export default ButtonComponent;