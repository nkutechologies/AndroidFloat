//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {logToConsole} from 'react-native/Libraries/Utilities/RCTLog';
import {Images} from '../../Constants/Images';
import Theme from '../../Utils/Theme';
import TextComponent from '../../Components/TextComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import {Icon} from 'react-native-elements';
import {Users} from '../Api/FirebaseCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// create a component
const Login = props => {
  const [username, setUserName] = useState('GSI2SP');
  const [password, setPassword] = useState('GSI2SP');
  const [loading, setLoading] = useState(false);
  const [see, setSee] = useState(true);

  const SignIn = async () => {
    if (username == '' || password == '') {
      Toast.show('Please Enter Details First');
    } else {
      setLoading(true);
      await auth()
        .signInWithEmailAndPassword(username + '@gmail.com', password)
        .then(async res => {
          console.log('auth user response', res);
          Users.getSingleUser(res.user.uid)
            .then(async documentSnapshot => {
              console.log('User data: ', documentSnapshot._data);
              if (documentSnapshot.exists) {
                await AsyncStorage.setItem(
                  'AuthData',
                  JSON.stringify(documentSnapshot._data),
                );
                props.navigation.navigate('Home');
              } else {
                Toast.show('Details Not Added yet');
              }
            })
            .catch(err => console.log('this is error fetching data', err))
            .finally(() => setLoading(false));
        })
        .catch(err => {
          if (err.code == 'auth/user-not-found') {
            Toast.show('User Not Registered');
          } else if (err.code == 'auth/wrong-password') {
            Toast.show('Incorrect Password');
          } else {
            Toast.show('Unknown Error');
          }
          console.log('error in signup', err.code);
        })
        .finally(() => setLoading(false));
    }
  };

  const SignIna = async () => {
    await firestore()
      .collection('FloatTerritoryJunction')
      .where('TerritoryId', '==', "MCH")
      .get()
      .then(res => {
        console.log(res);
      });

    // setLoading(true);
    // let allTerr;
    // await firestore()
    //   .collection('Territory')
    //   .get()
    //   .then(res => {
    //     allTerr = res._docs;
    //   });
    // console.log('all territories response', allTerr);
    // await firestore()
    //   .collection('Float')
    //   .get()
    //   .then(res => {
    //     console.log(res);
    //     res._docs.map(floats => {
    //       allTerr.map(async terr => {
    //         await firestore()
    //           .collection('FloatTerritoryJunction')
    //           .doc()
    //           .set({TerritoryId: terr._data.name, floatId: floats._data.id})
    //           .then(res => {
    //             setLoading(false);
    //           });
    //       });
    //     });
    //   });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={Images.loginlogo} style={styles.logo} />
        <View style={{paddingHorizontal: Theme.screenWidth / 14}}>
          <View style={styles.loginTextView}>
            <Text style={styles.loginTextStyle}>Welcome back,</Text>
            <Text
              style={[
                styles.loginTextStyle,
                {
                  fontSize: Theme.screenHeight / 50,
                  color: Theme.grey,
                  fontWeight: '400',
                  letterSpacing: 2,
                },
              ]}>
              Continue to Login
            </Text>
          </View>
          <View style={styles.inputView}>
            <TextComponent
              Title={'User Code'}
              source="mail"
              placeholder="BA-1"
              value={username}
              onChangeText={username => setUserName(username)}
            />
          </View>
          <View style={styles.passwordView}>
            <TextComponent
              Title={'Password'}
              iconPress={() => setSee(!see)}
              // source={see ? "ios-eye-off-sharp" : "eye"}
              placeholder="Enter your password"
              value={password}
              secureTextEntry={see ? true : false}
              onChangeText={password => setPassword(password)}
              name={see ? 'eye-off' : 'eye'}
              type={'ionicon'}
            />
          </View>
        </View>
        <View style={{marginVertical: Theme.screenHeight / 30}}>
          <ButtonComponent
            text="Login"
            onPress={() => SignIn()}
            isLoading={loading}
          />
        </View>
        {/* <View style={styles.lastTextView}>
                    <Text style={{ fontSize: Theme.screenHeight / 55 }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
                        <Text style={styles.sinupTextStyle}>SignUp</Text>
                    </TouchableOpacity>
                </View> */}
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: Theme.screenHeight / 4,
    width: Theme.screenHeight / 3,
    alignSelf: 'center',
    // backgroundColor:'pink'
  },
  loginTextView: {
    width: Theme.screenWidth,
    // paddingRight:Theme.screenWidth/79,
    // backgroundColor:'pink',
  },
  loginTextStyle: {
    color: Theme.black,
    fontSize: Theme.screenHeight / 30,
    fontWeight: 'bold',
  },
  inputView: {
    marginTop: Theme.screenHeight / 40,
    justifyContent: 'center',
    // paddingHorizontal:Theme.screenHeight/80,
  },
  forgotText: {
    color: Theme.black,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    fontSize: Theme.screenHeight / 65,
    // marginTop: Theme.screenHeight / 90,
    marginRight: Theme.screenHeight / 50,
  },
  lastTextView: {
    flexDirection: 'row',
    marginTop: Theme.screenHeight / 40,
    alignSelf: 'center',
  },
  passwordView: {
    justifyContent: 'center',
    // padding: 15,
  },
  sinupTextStyle: {
    color: Theme.blue,
    fontSize: Theme.screenHeight / 55,
  },
});

//make this component available to the app
export default Login;
