//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Theme from '../../Utils/Theme';
import {Images} from '../../Constants/Images';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ButtonComponent from '../../Components/ButtonComponent';
import Header from '../../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Users} from '../Api/FirebaseCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

const SelectImage = props => {
  const [ProfileImage, setProfileImage] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  // console.log('ye aya user', user);
  const {data} = props.route.params;
  // console.log('ye aya data', data);
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const data = await AsyncStorage.getItem('AuthData');
    setUser(JSON.parse(data));
  };

  const UploadFile = () => {
    if (ProfileImage != '') {
      const formData = new FormData();
      formData.append('id', user.id);
      formData.append('date', data.date);
      formData.append('longitude', data.longitude);
      formData.append('latitude', data.latitude);
      formData.append('CreatedDate', data.date);
      formData.append('image', {
        uri: ProfileImage.uri,
        type: ProfileImage.type,
        name: ProfileImage.fileName,
      });
      console.log('ye aya form data', formData);
      const headers = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      axios
        .post('http://goldcup.pk:8078/api/Attendence/Post', formData, headers)
        .then(function (response) {
          console.log('response :', response);
          Toast.show('Attendance Marked Successfully');
        })
        .catch(function (error) {
          console.log('error from image :', error);
          Toast.show('Attendance Was Not Marked');
        })
        .finally(() => setLoading2(false));
    } else {
      Toast.show('Please Add Image First');
    }
  };
  const pickImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      async response => {
        if (response.didCancel) {
        } else {
          setProfileImage(response.assets[0]);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Header
        backIcon={true}
        title="Uplaod Image"
        backIconPress={() => props.navigation.goBack()}
        // rightIcon="settings"
      />
      {loading2 ? (
        <View
          style={{
            height: Theme.screenHeight / 1.2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'small'} color={Theme.blue} />
        </View>
      ) : (
        <>
          {ProfileImage && ProfileImage != '' ? (
            <View>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  marginRight: Theme.screenWidth / 30,
                  marginVertical: Theme.screenHeight / 40,
                }}>
                <AntDesign
                  name="close"
                  onPress={() => setProfileImage('')}
                  size={Theme.screenHeight / 40}
                  color={Theme.black}
                />
              </TouchableOpacity>
              <Image
                source={{uri: ProfileImage.uri}}
                resizeMode="cover"
                style={{
                  height: Theme.screenHeight / 1.7,
                  width: Theme.screenWidth / 1,
                }}
              />
            </View>
          ) : (
            <View style={{justifyContent: 'center', flex: 1}}>
              <TouchableOpacity onPress={() => pickImage()}>
                <Image source={Images.camera} style={styles.imageStyle} />
              </TouchableOpacity>
            </View>
          )}
          <View style={{position: 'absolute', bottom: 30, alignSelf: 'center'}}>
            <ButtonComponent
              text="Submit"
              onPress={() => {
                if (ProfileImage != undefined) {
                  UploadFile();
                  props.navigation.navigate('Home');
                } else {
                  Toast.show('Please Select Image First');
                }
              }}
            />
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
  cameralogo: {
    backgroundColor: Theme.blue,
  },
  imageStyle: {
    alignSelf: 'center',
    height: Theme.screenHeight / 4.5,
    width: Theme.screenHeight / 4.5,
  },
});

//make this component available to the app
export default SelectImage;
