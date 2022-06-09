//import liraries
import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Theme from '../../Utils/Theme';
import {Images} from '../../Constants/Images';
import {Icon} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ButtonComponent from '../../Components/ButtonComponent';
import Header from '../../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Float, FileUplaod} from '../Api/FirebaseCalls';
// create a component
const FeedBackForm = props => {
  const [ProfileImage, setProfileImage] = useState('');
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    setUserData(JSON.parse(a));
  };

  const submitFeedbackForm = () => {
    setLoading(true);
    const data = {
      floatId: userData?.FloatId,
      image: 'www.google.com/usershbjh',
    };
    Float.submitFloatForm(userData?.FloatId, data)
      .then(resp => {
        console.log('Respoonse submiting floa data: ', resp);
        props.navigation.navigate('Home');
      })
      .catch(err => console.log('this is error submitn float data', err))
      .finally(() => setLoading(false));
  };

  const pickImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        // selectionLimit: 1,
      },
      async response => {
        if (response.didCancel) {
          console.log('cancel');
        } else {
          console.log('ye i pic', response);
          const file = response.assets[0];
          FileUplaod.upload(file);
          // .then(data => console.log('data respnse', data))
          // .catch(err => console.log(err));
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
              source={{uri: ProfileImage}}
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
