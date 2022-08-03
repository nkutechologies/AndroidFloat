//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Alert,
  Text,
  BackHandler,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {Card} from 'react-native-paper';
import {Images} from '../../Constants/Images';
import Theme from '../../Utils/Theme';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

// create a component
const Home = props => {
  const [userData, setUserData] = useState();
  const [AttendanceCheck, setAttendanceCheck] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getUser();

      const onBackPress = async () => {
        Alert.alert('Logout', 'Do you really want to exit the application?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  const backPress = async () => {
    Alert.alert('Logout', 'Do you really want to exit the application?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
    return true;
  };

  const getUser = async () => {
    await AsyncStorage.multiGet(['AuthData', 'Attendance'], (err, items) => {
      console.log('==>>', items);
      setUserData(JSON.parse(items[0][1]));
      const att = items[1][1];
      if (att) {
        const chk = JSON.parse(att);
        const date = new Date();
        const d = date.toISOString();
        const c = d.substring(0, 10);
        if (chk.date == c) {
          setAttendanceCheck(true);
        } else {
          setAttendanceCheck(false);
        }
      } else {
        setAttendanceCheck(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Dashboard"
        backIcon={true}
        backIconPress={() => backPress()}
        rightIcon={'exit-outline'}
        type={'ionicon'}
        rightIconPress={() =>
          Alert.alert('Logout', 'Do you really want to Logout?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: async () => {
                await AsyncStorage.clear(), props.navigation.replace('Login');
              },
            },
          ])
        }
      />
      <ImageBackground source={Images.homebg} style={styles.bgimageStyle}>
        <View style={{marginTop: Theme.screenHeight / 70}}>
          <View>
            <Card
              elevation={5}
              style={styles.cardViewStyle}
              onPress={() =>
                !AttendanceCheck
                  ? props.navigation.navigate('MapScreen')
                  : Toast.show('Attendance Already Marked')
              }>
              <View style={styles.cardFirstView}>
                <Image source={Images.dummy} style={styles.imageStyle} />
                <View style={styles.textViewStyle}>
                  <Text style={styles.nameTextStyle}>Attendance</Text>
                </View>
                <Image source={Images.fwdArrow} style={styles.logo} />
              </View>
            </Card>
          </View>
          <View>
            <Card
              elevation={10}
              style={styles.cardViewStyle}
              onPress={() => {
                const userCheck = userData.role.includes('Supervisor');
                if (userCheck) {
                  !AttendanceCheck
                    ? props.navigation.navigate('Stackload')
                    : Toast.show('Please Mark Attendance First');
                } else {
                  Toast.show('Not Allowed');
                }
              }}>
              <View style={styles.cardFirstView}>
                <Image source={Images.dummy} style={styles.imageStyle} />
                <View style={styles.textViewStyle}>
                  <Text style={styles.nameTextStyle}>Stock Load</Text>
                </View>
                <Image source={Images.fwdArrow} style={styles.logo} />
              </View>
            </Card>
          </View>
          <View>
            <Card
              elevation={10}
              style={styles.cardViewStyle}
              onPress={() =>
                AttendanceCheck
                  ? props.navigation.navigate('Cleanliness')
                  : Toast.show('Please Mark Attendance First')
              }>
              <View style={styles.cardFirstView}>
                <Image source={Images.dummy} style={styles.imageStyle} />
                <View style={styles.textViewStyle}>
                  <Text style={styles.nameTextStyle}>Float Cleanliness</Text>
                </View>
                <Image source={Images.fwdArrow} style={styles.logo} />
              </View>
            </Card>
          </View>
          <View>
            <Card
              elevation={10}
              style={styles.cardViewStyle}
              onPress={() => {
                const userCheck = userData.role.includes('Supervisor');
                if (userCheck) {
                  AttendanceCheck
                    ? props.navigation.navigate('FeedBackForm')
                    : Toast.show('Please Mark Attendance First');
                } else {
                  Toast.show('Not Allowed');
                }
              }}>
              <View style={styles.cardFirstView}>
                <Image source={Images.dummy} style={styles.imageStyle} />
                <View style={styles.textViewStyle}>
                  <Text style={styles.nameTextStyle}>Feedback Form</Text>
                </View>
                <Image source={Images.fwdArrow} style={styles.logo} />
              </View>
            </Card>
          </View>
          <View>
            <Card
              elevation={10}
              style={styles.cardViewStyle}
              onPress={() => {
                AttendanceCheck
                  ? props.navigation.navigate('ConsumerInter')
                  : Toast.show('Please Mark Attendance First');
              }}>
              <View style={styles.cardFirstView}>
                <Image source={Images.dummy} style={styles.imageStyle} />
                <View style={styles.textViewStyle}>
                  <Text style={styles.nameTextStyle}>
                    Consumer Interception
                  </Text>
                </View>
                <Image source={Images.fwdArrow} style={styles.logo} />
              </View>
            </Card>
          </View>
          <View>
            <Card
              elevation={10}
              style={styles.cardViewStyle}
              onPress={() =>
                AttendanceCheck
                  ? props.navigation.navigate('Summary')
                  : Toast.show('Please Mark Attendance First')
              }>
              <View style={styles.cardFirstView}>
                <Image source={Images.dummy} style={styles.imageStyle} />
                <View style={styles.textViewStyle}>
                  <Text style={styles.nameTextStyle}>Previous Summary</Text>
                </View>
                <Image source={Images.fwdArrow} style={styles.logo} />
              </View>
            </Card>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  bgimageStyle: {
    flex: 1,
    marginTop: Theme.screenHeight / 98,
    // height: Theme.screenHeight,
    // width: Theme.screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    left: 30,
    height: Theme.screenHeight / 20,
    width: Theme.screenHeight / 20,
    //  elevation:5,
    //  backgroundColor:'yellow'
  },
  imageStyle: {
    right: 45,
    height: Theme.screenHeight / 11,
    width: Theme.screenHeight / 11,
    borderRadius: 100,
    //    backgroundColor:'red'
  },
  nameTextStyle: {
    fontWeight: 'bold',
    fontSize: Theme.screenHeight / 48,
    color: Theme.black,
  },
  cardViewStyle: {
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: Theme.screenHeight / 150,
    padding: Theme.screenHeight / 99,
  },
  cardFirstView: {flexDirection: 'row', borderRadius: 20, alignItems: 'center'},
  textViewStyle: {
    width: Theme.screenWidth / 2.5,
    justifyContent: 'center',
    right: 30,
  },
});

//make this component available to the app
export default Home;
