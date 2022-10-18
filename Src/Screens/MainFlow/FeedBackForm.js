//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Theme from '../../Utils/Theme';
import {Images} from '../../Constants/Images';
import {Icon} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ButtonComponent from '../../Components/ButtonComponent';
import Header from '../../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {Float} from '../Api/FirebaseCalls';
import axios from 'axios';
import {postData} from '../Database/ApiCalls';
// create a component
const FeedBackForm = props => {
  const [ProfileImage, setProfileImage] = useState('');
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    console.log(a);
    setUserData(JSON.parse(a));
  };

  const submitFeedbackForm = () => {
    if (ProfileImage == '') {
      Toast.show('Please Add Image First');
    } else {
      UploadFile();
      setLoading(true);
    }
  };
  console.log(userData);
  const UploadFile = () => {
    const a = new Date();
    const d = a.toISOString();
    const formData = new FormData();
    formData.append('file', {
      uri: ProfileImage.uri,
      type: ProfileImage.type,
      name: ProfileImage.fileName,
    });
    formData.append('Id', 0);
    formData.append('floatId', userData?.floatId);
    formData.append('fireStoreId', userData?.fireStoreId);
    formData.append('PreviewImageUrl', '');
    formData.append('DownloadImageUrl', '');
    formData.append('createdBy', `${userData.id}`);
    formData.append('updatedBy', `${userData.id}`);
    formData.append('createdDate', '2022-08-03T18:02:11.681Z');
    formData.append('updatedDate', '2022-08-03T18:02:11.681Z');
    axios.defaults.headers['Content-Type'] = 'multipart/form-data';
    console.log('yeh aya form data', formData);
    postData
      .feedBackForm(formData)
      .then(function (response) {
        console.log('suces posting feedback form', response);
        axios.defaults.headers['Content-Type'] = 'application/json';
        props.navigation.navigate('Home');
        Toast.show('FeedBack Posted!');
      })
      .catch(function (error) {
        console.log('error from image :', error);
        Toast.show('FeedBack Not Posted!');
      })
      .finally(() => setLoading(false));
  };

  const pickImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.4,
      },
      async response => {
        if (response.didCancel) {
        } else {
          console.log('==>>', response);
          setProfileImage(response.assets[0]);
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <Header
        backIcon={true}
        title="Submit Form"
        backIconPress={() => props.navigation.goBack()}
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
        <View
          style={[
            styles.container,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          {/* <Text style={{ fontSize: Theme.screenHeight / 30, color: Theme.black, fontWeight: 'bold' }}>Upload Form Camera</Text> */}
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
            <TouchableOpacity onPress={() => pickImage()}>
              <Image source={Images.camera} style={styles.imageStyle} />
            </TouchableOpacity>
          )}

          <ButtonComponent
            text="Submit"
            onPress={() => submitFeedbackForm()}
            isLoading={loading}
          />
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: Theme.white,
  },
  cameralogo: {
    backgroundColor: Theme.blue,
  },
  imageStyle: {
    height: Theme.screenHeight / 3,
    width: Theme.screenHeight / 3,
  },
});

//make this component available to the app
export default FeedBackForm;
