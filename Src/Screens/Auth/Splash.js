//import liraries
import React, {Component, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  BackHandler,
  Alert,
} from 'react-native';
import Theme from '../../Utils/Theme';
import {Images} from '../../Constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-simple-toast';
// create a component
const Splash = props => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      hasLocationPermission();
    });
    return unsubscribe;
  }, []);

  const hasLocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      GetData();
    } else {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        GetData();
      }
      if (status === PermissionsAndroid.RESULTS.DENIED) {
        Alert.alert(
          'Please Grant Location Permission',
          'To access the application you must go to settings and allow location permissions',
          [
            {
              text: 'Cancel',
              onPress: () => BackHandler.exitApp(),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => BackHandler.exitApp(),
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
            onDismiss: () => null,
          },
        );
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Please Grant Location Permission',
          'To access the application you must go to settings and allow location permissions',
          [
            {
              text: 'Cancel',
              onPress: () => BackHandler.exitApp(),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => BackHandler.exitApp(),
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
            onDismiss: () => null,
          },
        );
      }
    }
  };

  const GetData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    if (a != null) {
      props.navigation.navigate('Home');
    } else {
      props.navigation.navigate('Login');
    }
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
