import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Theme from '../Utils/Theme';

const ButtonComponent = ({onPress, text, isGreen, font, isLoading}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
      <View
        style={
          isGreen ? {...styles.btn, backgroundColor: Theme.primary} : styles.btn
        }>
        {isLoading ? (
          <ActivityIndicator color={Theme.white} />
        ) : (
          <Text
            numberOfLines={1}
            style={
              font
                ? {
                    ...styles.btnText,
                    fontSize: 15,
                  }
                : styles.btnText
            }>
            {text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: Theme.screenWidth / 1.2,
    borderRadius: 10,
    marginTop: Theme.screenHeight / 50,
    alignItems: 'center',
    backgroundColor: Theme.blue,
    justifyContent: 'center',
    paddingVertical: Theme.screenHeight / 80,
    alignSelf: 'center',
  },
  btnText: {
    width: '90%',
    color: Theme.white,
    fontSize: Theme.screenHeight / 40,
    textAlign: 'center',
  },
});

export default ButtonComponent;
