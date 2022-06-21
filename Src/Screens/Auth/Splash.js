//import liraries
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import Theme from '../../Utils/Theme';
import {Images} from '../../Constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
// create a component
const Splash = props => {
  useEffect(() => {
    GetData();
  }, []);
  const GetData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    setTimeout(() => {
      if (a != null) {
        props.navigation.navigate('Home');
      } else {
        props.navigation.navigate('Login');
      }
    }, 1000);
  };
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={Images.splashlogo} style={styles.bgimageStyle}> */}
      <LottieView
        source={require('../../Components/loader/truck.json')}
        autoPlay
        loop
        style={styles.bgimageStyle}></LottieView>

      <Image source={Images.loginlogo} style={styles.logo} />
      {/* </ImageBackground> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgimageStyle: {
    height: Theme.screenHeight / 3.5,
    width: Theme.screenWidth / 3.5,
  },
  floatTextStyle: {
    color: 'white',
    fontSize: 50,
  },
  logo: {
    position: 'absolute',
    bottom: Theme.screenHeight / 5.5,
    height: Theme.screenHeight / 3,
    width: Theme.screenHeight / 3,
  },
});

//make this component available to the app
export default Splash;
