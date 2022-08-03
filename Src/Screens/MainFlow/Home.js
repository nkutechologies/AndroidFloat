//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Alert,
  Text,
  BackHandler,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {Images} from '../../Constants/Images';
import Theme from '../../Utils/Theme';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {Attendance, newConsumerData} from '../Api/FirebaseCalls';
import firestore from '@react-native-firebase/firestore';

const data = [
  {
    id: 0,
    name: 'Attendance',
    quant: '10%',
  },
  {
    id: 1,
    name: 'Stock Load',
    quant: '15%',
  },
  {
    id: 2,
    name: 'Float Cleanliness',
    quant: '15%',
  },
  {
    id: 4,
    name: 'Feedback Form',
  },
  {
    id: 3,
    name: 'Consumer Inter',
    quant: '25%',
  },
];

// create a component
const Home = props => {
  const [userData, setUserData] = useState();
  const [attendanceCheck, setAttendanceCheck] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      getUser();
      // ChangeDataStructureForConsumerInteception();
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
    // const a = await AsyncStorage.getItem('AuthData');
    // const b = JSON.parse(a);
    // setUserData(b);
    // getUserAttendance(b?.id);

    // await firestore()
    //   .collection('ConsumerDataForm')
    //   .doc('ConsumerDataForm')
    //   .get()
    //   .then(data => {
    //     const arr = data.data().dataArr.toString();
    //     const length = new TextEncoder().encode(arr).length;
    //     console.log(length/1024);
    //   });

    await firestore()
      .collection('newStockLoad')
      .where('newStockLoad', 'array-contains', '1234')
      .get()
      .then(res => {
        console.log(res);
      });
    console.log('runs');

    // .onSnapshot(snap => {
    //   const data = snap.data().dataArr.filter(msg => msg.stockname == '567');
    //   console.log('==>>', data);
    //   snap.ref.update({
    //     dataArr: firestore.FieldValue.arrayUnion({
    //       ...data[0],
    //       name: 'newname',
    //     }),
    //   });
    // });
  };
  async function getUserAttendance(id) {
    await Attendance.getUserAttendance(id)
      .then(data => {
        console.log('user attendacen is==>>', data);
        if (data?._docs.length > 0) {
          setAttendanceCheck(true);
        } else {
          setAttendanceCheck(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function ChangeDataStructureForConsumerInteception() {
    let obj = {dataArr: []};
    await newConsumerData
      .setPrevConsumerData()
      .then(res => {
        console.log('res', res);
        obj = {dataArr: res?._docs};
      })
      .catch(err => {
        console.log('==>> err', err);
      });

    console.log('==>>', obj);
    await newConsumerData
      .setConsumerData(obj)
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('=111=>> err', err);
      });
  }
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
                await AsyncStorage.removeItem('AuthData'),
                  props.navigation.replace('Login');
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
              onPress={() => props.navigation.navigate('MapScreen')}>
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
                x;
                if (userCheck) {
                  !attendanceCheck
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
                attendanceCheck
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
                  attendanceCheck
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
                attendanceCheck
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
                !attendanceCheck
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
