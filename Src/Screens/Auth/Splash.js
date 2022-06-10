//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import Theme from '../../Utils/Theme';
import {Images} from '../../Constants/Images';

import LottieView from 'lottie-react-native';
// create a component

const Splash = props => {
  setTimeout(() => {
    props.navigation.navigate('Login');
  }, 2200);
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={Images.splashlogo} style={styles.bgimageStyle}> */}
      <LottieView
        source={require('../../Components/loader/loader19.json')}
        autoPlay
        loop
        style={{
          height: Theme.screenHeight / 1,
          width: Theme.screenWidth / 1,
        }}></LottieView>

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
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatTextStyle: {
    color: 'white',
    fontSize: 50,
  },
  logo: {
    position: 'absolute',
    height: Theme.screenHeight / 3,
    width: Theme.screenHeight / 3,
  },
});

//make this component available to the app
export default Splash;
