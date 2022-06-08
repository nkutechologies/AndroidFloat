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
import {Modal} from 'react-native-paper';
import Header from '../../Components/Header';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  useFocusEffect(
    React.useCallback(() => {
      // getUser();
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
    const a = await AsyncStorage.getItem('AuthData');
    const user = JSON.parse(a);
    console.log(user);
    const usersCollection = firestore().collection('user').doc(user.id).set({
      terrirtoy: 3,
      name: 'ALi',
      place: 'newkjasenjkfnjkasnfjk place',
      instagramId: 1,
    });

    // const usersCollection = firestore()
    //   .collection('user')
    //   .doc('NLgFQzKD9IaXRXOFy92U3OLYl1t2')
    //   .get()
    //   .then(documentSnapshot => {
    //getting single user
    //     if (documentSnapshot.exists) {
    //       console.log('User data: ', documentSnapshot.data());
    //     }
    //getting all users
    // documentSnapshot.forEach(doc => {
    //   const data = doc.data();
    //   console.log('this is id against this ', doc.id, snapshot);
    // });
    //   })
    //   .catch(err => {
    //     console.log('Error getting documents', err);
    //   });
    //   .then(querySnapshot =>
    //     querySnapshot.docs.map(doc => {
    //       console.log('LOG 1', doc.data());
    //       return doc.data();
    //     }),
    //   )
    //   .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Dashboard"
        backIcon={true}
        backIconPress={() => backPress()}
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
              onPress={() => props.navigation.navigate('Stackload')}>
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
              onPress={() => props.navigation.navigate('Cleanliness')}>
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
              onPress={() => props.navigation.navigate('FeedBackForm')}>
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
              onPress={() => props.navigation.navigate('ConsumerInter')}>
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
    marginVertical: Theme.screenHeight / 85,
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
