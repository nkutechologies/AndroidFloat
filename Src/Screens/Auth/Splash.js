//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground ,Image} from 'react-native';
import Theme from '../../Utils/Theme';
import { Images } from '../../Constants/Images';

// create a component
const Splash = (props) => {
  setTimeout(() => {
    props.navigation.navigate('Login');
  }, 4000);
  return (
    <View style={styles.container}>
      <ImageBackground source={Images.splashlogo} style={styles.bgimageStyle}>
      <Image source={Images.loginlogo} style={styles.logo} />
      </ImageBackground>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#65A1DA',
  // },
  bgimageStyle:{
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatTextStyle:{
    color: 'white',
    fontSize: 50,
  },
  logo:{
    height:Theme.screenHeight/3,
    width:Theme.screenHeight/3
  }
});

//make this component available to the app
export default Splash;
