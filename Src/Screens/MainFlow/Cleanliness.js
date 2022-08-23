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
  ActivityIndicator,
} from 'react-native';
import Theme from '../../Utils/Theme';
import {RadioButton} from 'react-native-paper';
import {Images} from '../../Constants/Images';
import Header from '../../Components/Header';
import ButtonComponent from '../../Components/ButtonComponent';
import {launchCamera} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {postData} from '../Database/ApiCalls';

// create a component
const Cleanliness = props => {
  const [checked, setChecked] = useState('');
  const [ProfileImage, setProfileImage] = useState('');
  const [ProfileImage1, setProfileImage1] = useState('');
  const [ProfileImage2, setProfileImage2] = useState('');
  const [ProfileImage3, setProfileImage3] = useState('');
  const [userData, setUserData] = useState();
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const pickImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.1,
        // selectionLimit: 1,
      },
      async response => {
        setProfileImage(response.assets[0]);
      },
    );
  };
  const pickImage1 = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.1,
        // selectionLimit: 1,
      },
      async response => {
        setProfileImage1(response.assets[0]);
      },
    );
  };
  const pickImage2 = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.1,
      },
      async response => {
        setProfileImage2(response.assets[0]);
      },
    );
  };
  const pickImage3 = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.1,
      },
      async response => {
        setProfileImage3(response.assets[0]);
      },
    );
  };

  const getUserData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    const data = JSON.parse(a);
    setUserData(data);
  };
  console.log(userData);
  const UploadData = () => {
    const a = new Date();
    const d = a.toISOString();
    const formData = new FormData();
    formData.append('file1', {
      uri: ProfileImage.uri,
      type: ProfileImage.type,
      name: ProfileImage.fileName,
    });
    formData.append('file2', {
      uri: ProfileImage1.uri,
      type: ProfileImage1.type,
      name: ProfileImage1.fileName,
    });
    formData.append('file3', {
      uri: ProfileImage2.uri,
      type: ProfileImage2.type,
      name: ProfileImage2.fileName,
    });
    formData.append('file4', {
      uri: ProfileImage3.uri,
      type: ProfileImage3.type,
      name: ProfileImage3.fileName,
    });
    formData.append('userId', `${userData?.id}`);
    formData.append('floatId', `${userData?.floatId}`);
    formData.append('date', d.substring(0, 10));
    formData.append('Status', checked == 'first' ? 'Ok' : 'Not Ok');
    axios.defaults.headers['Content-Type'] = 'multipart/form-data';
    console.log('thisis form data', formData);
    postData
      .floatCleanliness(formData)
      .then(function (response) {
        axios.defaults.headers['Content-Type'] = 'application/json';
        console.log('response :', response);
        props.navigation.navigate('Home');
        Toast.show('Data Updated!');
      })
      .catch(function (error) {
        console.log('error from image :', error);
      })
      .finally(() => setLoading2(false));
  };

  const SetFloatData = () => {
    if (
      ProfileImage3 != '' &&
      ProfileImage1 != '' &&
      ProfileImage2 != '' &&
      ProfileImage3 != '' &&
      checked != ''
    ) {
      UploadData();
      setLoading2(true);
    } else {
      Toast.show('Please Fill All The Data');
    }
  };
  return (
    <View style={styles.container}>
      {LogBox.ignoreAllLogs()}
      <Header
        backIcon={true}
        backIconPress={() => props.navigation.goBack()}
        title="Float Cleaniless"
      />

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
                  source={{uri: ProfileImage.uri}}
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
                  source={{uri: ProfileImage1.uri}}
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
                  source={{uri: ProfileImage2.uri}}
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
                  source={{uri: ProfileImage3.uri}}
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
          <ButtonComponent
            text="Submit"
            isLoading={loading2}
            onPress={() => SetFloatData()}
          />
        </View>
      </>
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
