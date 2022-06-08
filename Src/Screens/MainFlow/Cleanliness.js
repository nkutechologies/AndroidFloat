//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  LogBox,
} from 'react-native';
import Theme from '../../Utils/Theme';
import {RadioButton} from 'react-native-paper';
import {Images} from '../../Constants/Images';
import Header from '../../Components/Header';
import ButtonComponent from '../../Components/ButtonComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Float} from '../Api/FirebaseCalls';

// create a component
const Cleanliness = props => {
  const [checked, setChecked] = useState('first');
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileImage1, setProfileImage1] = useState('');
  const [ProfileImage2, setProfileImage2] = useState('');
  const [ProfileImage3, setProfileImage3] = useState('');
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  const pickImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        // selectionLimit: 1,
      },
      async response => {
        setProfileImage(response.assets[0].uri);
        console.log('ye i pic', ProfileImage);
      },
    );
  };
  const pickImage1 = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        // selectionLimit: 1,
      },
      async response => {
        setProfileImage1(response.assets[0].uri);
      },
    );
  };
  const pickImage2 = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        // selectionLimit: 1,
      },
      async response => {
        setProfileImage2(response.assets[0].uri);
      },
    );
  };
  const pickImage3 = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        // selectionLimit: 1,
      },
      async response => {
        setProfileImage3(response.assets[0].uri);
      },
    );
  };

  const getUserData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    const data = JSON.parse(a);
    setUserData(JSON.parse(a));
    getUserFloat(data.FloatId);
  };
  const getUserFloat = id => {
    Float.getUserFloat(id)
      .then(resp => {
        console.log('Respoonse getting user floa data: ', resp);
      })
      .catch(err => console.log('this is error getting user float data', err))
      .finally(() => setLoading(false));
  };

  const SetFloatData = () => {
    const data = {
      images: ['www,google.com', 'www.google.com'],
      status: checked == 'first' ? 'Ok' : 'NotOk',
      floatId: userData?.FloatId,
    };
    console.log(userData, data);
    Float.setFloatCleanliness(userData?.FloatId, data)
      .then(resp => {
        console.log('Respoonse setting data: ', resp);
        props.navigation.navigate('Home');
      })
      .catch(err => console.log('this is error setting user float data', err))
      .finally(() => setLoading(false));
  };
  return (
    <View style={styles.container}>
      {LogBox.ignoreAllLogs()}
      <Header
        backIcon={true}
        backIconPress={() => props.navigation.goBack()}
        title="Float Cleaniless"
      />
      {loading ? null : (
        <>
          <View style={{marginTop: Theme.screenHeight / 20}}>
            <View style={styles.radiobuttonView}>
              <RadioButton
                color={Theme.blue}
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <View style={{width: Theme.screenWidth / 2}}>
                <Text style={styles.okTextStyle}>OK</Text>
              </View>
            </View>
            <View style={styles.radiobuttonView}>
              <RadioButton
                color={Theme.blue}
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
              />
              <View style={{width: Theme.screenWidth / 2}}>
                <Text style={styles.okTextStyle}>Not OK</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                marginTop: Theme.screenHeight / 20,
              }}>
              {ProfileImage && ProfileImage != '' ? (
                <View>
                  <ImageBackground
                    source={{uri: ProfileImage}}
                    resizeMode="cover"
                    style={styles.bgimageStyle}>
                    <TouchableOpacity style={styles.crossViewStyle}>
                      <AntDesign
                        name="close"
                        onPress={() => setProfileImage('')}
                        size={Theme.screenHeight / 40}
                        color={Theme.white}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              ) : (
                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => pickImage()}>
                    <Image source={Images.camera} style={styles.imageStyle} />
                  </TouchableOpacity>
                </View>
              )}
              {ProfileImage1 && ProfileImage1 != '' ? (
                <View>
                  <ImageBackground
                    source={{uri: ProfileImage1}}
                    resizeMode="cover"
                    style={styles.bgimageStyle}>
                    <TouchableOpacity style={styles.crossViewStyle}>
                      <AntDesign
                        name="close"
                        onPress={() => setProfileImage1('')}
                        size={Theme.screenHeight / 40}
                        color={Theme.white}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              ) : (
                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => pickImage1()}>
                    <Image source={Images.camera} style={styles.imageStyle} />
                  </TouchableOpacity>
                </View>
              )}
              {ProfileImage2 && ProfileImage2 != '' ? (
                <View>
                  <ImageBackground
                    source={{uri: ProfileImage2}}
                    resizeMode="cover"
                    style={styles.bgimageStyle}>
                    <TouchableOpacity style={styles.crossViewStyle}>
                      <AntDesign
                        name="close"
                        onPress={() => setProfileImage2('')}
                        size={Theme.screenHeight / 40}
                        color={Theme.white}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              ) : (
                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => pickImage2()}>
                    <Image source={Images.camera} style={styles.imageStyle} />
                  </TouchableOpacity>
                </View>
              )}
              {ProfileImage3 && ProfileImage3 != '' ? (
                <View>
                  <ImageBackground
                    source={{uri: ProfileImage3}}
                    resizeMode="cover"
                    style={styles.bgimageStyle}>
                    <TouchableOpacity style={styles.crossViewStyle}>
                      <AntDesign
                        name="close"
                        onPress={() => setProfileImage3('')}
                        size={Theme.screenHeight / 40}
                        color={Theme.white}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              ) : (
                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => pickImage3()}>
                    <Image source={Images.camera} style={styles.imageStyle} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              bottom: Theme.screenHeight / 20,
            }}>
            <ButtonComponent text="Submit" onPress={() => SetFloatData()} />
          </View>
        </>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  okTextStyle: {
    fontSize: Theme.screenHeight / 30,
    color: Theme.black,
    marginLeft: 50,
    fontWeight: 'bold',
  },
  radiobuttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.screenWidth / 20,
  },
  imageStyle: {
    height: Theme.screenHeight / 6.5,
    width: Theme.screenHeight / 6.5,
  },
  crossViewStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    backgroundColor: Theme.black,
    borderRadius: 50,
    margin: 5,
  },
  bgimageStyle: {
    height: Theme.screenHeight / 6.5,
    width: Theme.screenHeight / 6.5,
    marginVertical: 15,
  },
});

//make this component available to the app
export default Cleanliness;
