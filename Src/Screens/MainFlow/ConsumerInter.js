//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import Theme from '../../Utils/Theme';
import TextComponent from '../../Components/TextComponent';
import DropDownComponent from '../../Components/DropDownComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Header from '../../Components/Header';
import Geolocation from 'react-native-geolocation-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {postData} from '../Database/ApiCalls';
import {
  ClassicTerritories,
  Floats,
  GSITerritory,
  userbrands,
} from '../../Constants/UserConstants';

// create a component
const ConsumerInter = props => {
  const [Vendor, setVendor] = useState({address: '', CNIC: '', cellNo: '+92'});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [userTown, setUserTown] = useState(['Please Select Territory']);
  const [allTerritories, setAllTerritories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [userLocation, setuserLocation] = useState({lat: 0, lng: 0});
  const [ProfileImage, setProfileImage] = useState();
  const [dropdownRef, setdropdownRef] = useState();

  useEffect(() => {
    getUserData();
    mapView();
  }, []);
  const getUserData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    const data = JSON.parse(a);
    console.log('Response of user data', data);
    setUserData(JSON.parse(a));
    const floatCheck = Floats.findIndex(item => item.id == data.floatId);
    if (floatCheck != -1) {
      const f = Floats[floatCheck].name.includes('GSI');
      if (f) {
        const userT = GSITerritory.map(item => item.name);
        setAllTerritories(GSITerritory);
      } else {
        const userT = ClassicTerritories.map(item => item.name);
        setAllTerritories(ClassicTerritories);
      }
    } else {
      Toast.show('Error Loading');
    }
    setAllBrands(userbrands);
  };

  const submitDataForm = () => {
    if (
      // Vendor.CNIC &&
      // Vendor.address &&
      Vendor.age &&
      Vendor.callStatus &&
      Vendor.cellNo != '+92' &&
      Vendor.currentBrand &&
      Vendor.name &&
      Vendor.targetBrand &&
      Vendor.territoryName &&
      Vendor.town &&
      Vendor.prizeGiven &&
      ProfileImage != undefined
    ) {
      if (userLocation.lat != 0 && userLocation.lng != 0) {
        setButtonLoading(true);
        UploadFile();
      } else {
        Toast.show('Please Grant Location Permission First');
      }
    } else {
      Toast.show('Please Fill All The Details');
    }
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      console.log('Location permission denied by user.');
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('Location permission revoked by user.');
    }
    return false;
  };

  const mapView = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(position => {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      setuserLocation({lat: lat, lng: lng});
    });
  };

  const UploadFile = () => {
    const a = new Date();
    const d = a.toISOString();
    const formData = new FormData();
    formData.append('address', Vendor.address);
    formData.append('cNIC', Vendor.CNIC);
    formData.append('age', Vendor.age);
    formData.append('callStatus', Vendor.callStatus);
    formData.append('cellNo', Vendor.cellNo);
    formData.append('currentBrand', Vendor.currentBrand);
    formData.append('date', d.substring(0, 10));
    formData.append('lat', `${userLocation.lat}`);
    formData.append('lng', `${userLocation.lng}`);
    formData.append('name', Vendor.name);
    formData.append('prizeGiven', Vendor.prizeGiven);
    formData.append('targetBrand', Vendor.targetBrand);
    formData.append('territoryName', Vendor.territoryName);
    formData.append('town', Vendor.town);
    formData.append('userID', `${userData.id}`);
    formData.append('previewImageUrl', '');
    formData.append('downloadImageUrl', '');
    formData.append('file', {
      uri: ProfileImage.uri,
      type: ProfileImage.type,
      name: ProfileImage.fileName,
    });
    console.log('ye aya form data', formData);
    axios.defaults.headers['Content-Type'] = 'multipart/form-data';

    postData
      .postInterception(formData)
      .then(function (response) {
        console.log('response from interveption', response);
        axios.defaults.headers['Content-Type'] = 'application/json';
        props.navigation.navigate('Home');
        Toast.show('Interception Saved!');
      })
      .catch(function (error) {
        console.log('error from image :', error.response);
        Toast.show('Interception Save Error!');
      })
      .finally(() => setButtonLoading(false), setLoading(false));
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
        title="Consumer Data Form"
        backIconPress={() => props.navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: Theme.screenWidth / 20,
            marginVertical: Theme.screenHeight / 30,
          }}>
          {loading ? null : (
            <>
              <View style={styles.inputView}>
                <DropDownComponent
                  Title={'Territory'}
                  options={
                    allTerritories.length > 0
                      ? allTerritories.map(item => item.name).sort()
                      : ['Loading Wait']
                  }
                  disabled={allTerritories.length > 0 ? false : true}
                  defaultValue={Vendor.territoryName}
                  dropdownStyle={styles.dropdownStyle}
                  IconName={'angle-down'}
                  IconType={'font-awesome-5'}
                  onSelect={(index, value) => {
                    setVendor({...Vendor, territoryName: value});
                    const a = allTerritories.findIndex(
                      item => item.name == value,
                    );
                    setUserTown(allTerritories[a].town);
                    if (dropdownRef) {
                      dropdownRef.current.select(-1);
                      // setVendor({...Vendor, town: undefined});
                    }
                  }}
                />
              </View>
              <View style={styles.passwordView}>
                <DropDownComponent
                  Title={'Town'}
                  options={userTown}
                  disabled={Vendor.territoryName ? false : true}
                  defaultValue={'Please Select'}
                  IconName={'angle-down'}
                  IconType={'font-awesome-5'}
                  dropdownStyle={styles.dropdownStyle}
                  onSelect={(index, value, ref) => {
                    setVendor({...Vendor, town: value});
                    setdropdownRef(ref);
                  }}
                />
              </View>
              <View style={styles.passwordView}>
                <TextComponent
                  Title={'Name'}
                  placeholder="Enter Your Name"
                  value={Vendor.name}
                  onChangeText={text => setVendor({...Vendor, name: text})}
                />
              </View>
              <View style={styles.passwordView}>
                <TextComponent
                  Title={'CNIC'}
                  placeholder="Enter Your CNIC"
                  value={Vendor.CNIC}
                  keyboardType={'numeric'}
                  onChangeText={text => {
                    if (text.includes('.')) {
                    } else {
                      if (text.length > Vendor.CNIC.length) {
                        if (text.length < 5) {
                          setVendor({...Vendor, CNIC: text});
                        } else if (text.length == 5) {
                          setVendor({...Vendor, CNIC: text + '-'});
                        } else if (text.length > 6 && text.length < 13) {
                          setVendor({...Vendor, CNIC: text});
                        } else if (text.length == 13) {
                          setVendor({...Vendor, CNIC: text + '-'});
                        } else if (text.length == 15) {
                          setVendor({...Vendor, CNIC: text});
                        } else if (text.length >= 16) {
                          // Toast.show('NIC cannot be greater than 13 digits');
                          null;
                        }
                      } else {
                        setVendor({...Vendor, CNIC: text});
                      }
                    }
                  }}
                />
              </View>
              <View style={styles.passwordView}>
                <TextComponent
                  Title={'Cell No'}
                  placeholder="Enter Your Number"
                  value={Vendor.cellNo}
                  keyboardType={'numeric'}
                  onChangeText={text => {
                    if (text.includes('.')) {
                    } else {
                      if (text.length > Vendor.cellNo.length) {
                        if (text.length < 6) {
                          setVendor({...Vendor, cellNo: text});
                        } else if (text.length == 6) {
                          setVendor({...Vendor, cellNo: text + '-'});
                        } else if (text.length > 7 && text.length < 15) {
                          setVendor({...Vendor, cellNo: text});
                        } else if (text.length >= 15) {
                          null;
                        }
                      } else {
                        if (text.length > 2) {
                          setVendor({...Vendor, cellNo: text});
                        }
                      }
                    }
                  }}
                />
              </View>
              <View style={styles.passwordView}>
                <TextComponent
                  Title={'Age'}
                  placeholder="Enter Your Age"
                  value={Vendor.age}
                  keyboardType={'numeric'}
                  onChangeText={text => {
                    if (text.length > 2) {
                      setVendor({...Vendor, age: Vendor.age});
                    } else {
                      setVendor({...Vendor, age: text});
                    }
                  }}
                />
              </View>
              <View style={styles.textView}>
                <TextComponent
                  Title={'Address'}
                  placeholder="Enter your address"
                  value={Vendor.address}
                  multiline={true}
                  style={{
                    height: Theme.screenHeight / 15,
                  }}
                  onChangeText={text => setVendor({...Vendor, address: text})}
                />
              </View>
              <View style={styles.passwordView}>
                <DropDownComponent
                  Title={'Current Brand'}
                  options={
                    allBrands.length > 0 ? allBrands : ['Loading Please Wait']
                  }
                  // disabled={allBrands?.length > 0 ? false : true}
                  defaultValue={'please Select'}
                  IconName={'angle-down'}
                  IconType={'font-awesome-5'}
                  dropdownStyle={styles.dropdownStyle}
                  onSelect={(index, value) => {
                    setVendor({...Vendor, currentBrand: value});
                  }}
                />
              </View>
              <View style={styles.passwordView}>
                <DropDownComponent
                  Title={'Target Brand'}
                  options={[
                    'Capstan by Pall Mall',
                    'Gold Flake By Rothmans',
                    'Morven classic',
                    'Morven by Chesterfield',
                    'Red & white',
                  ]}
                  defaultValue={'Please Select'}
                  IconName={'angle-down'}
                  IconType={'font-awesome-5'}
                  dropdownStyle={styles.dropdownStyle}
                  onSelect={(index, value) => {
                    // getUserStockData(value);
                    setVendor({...Vendor, targetBrand: value});
                  }}
                />
              </View>
              <View style={styles.passwordView}>
                <DropDownComponent
                  Title={'Call Status'}
                  options={['Productive', 'Intercept']}
                  defaultValue={'Please Select'}
                  IconName={'chevron-down'}
                  IconType={'feather'}
                  dropdownStyle={styles.dropdownStyle}
                  onSelect={(index, value) => {
                    setVendor({...Vendor, callStatus: value});
                  }}
                />
              </View>
              <View style={styles.passwordView}>
                <DropDownComponent
                  Title={'Prize Given'}
                  options={[
                    'No Prize Given',
                    'Headphones',
                    'Key Chain',
                    'Wallet',
                    'GSI Pack',
                  ]}
                  defaultValue={'Please Select'}
                  IconName={'angle-down'}
                  IconType={'font-awesome-5'}
                  dropdownStyle={styles.dropdownStyle}
                  onSelect={(index, value) => {
                    setVendor({...Vendor, prizeGiven: value});
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={styles.imageButton}>
                <Image
                  source={
                    ProfileImage
                      ? {uri: ProfileImage.uri}
                      : require('../../Assets/Images/camera.png')
                  }
                  style={{width: 40, height: 40}}
                />
                <Text>Interaction Image</Text>
              </TouchableOpacity>
              <ButtonComponent
                text="Submit"
                isLoading={buttonLoading}
                onPress={() => submitDataForm()}
                // onPress={() => UploadFile()}
              />
            </>
          )}
        </View>
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
    backgroundColor: Theme.white,
  },
  consumerTextStyle: {},
  inputView: {
    justifyContent: 'center',
  },
  passwordView: {
    justifyContent: 'center',
  },
  dropdownStyle: {
    width: Theme.screenWidth / 1.5,
    elevation: 8,
  },
  imageButton: {
    height: Theme.screenHeight / 15,
    width: Theme.screenWidth / 2,
    backgroundColor: '#BEBEBE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.screenWidth / 30,
    marginTop: 20,
    borderRadius: 5,
  },
});

//make this component available to the app
export default ConsumerInter;
