//import liraries
import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import Theme from '../../Utils/Theme';
import TextComponent from '../../Components/TextComponent';
import DropDownComponent from '../../Components/DropDownComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConsumerForm, Territory, Brands} from '../Api/FirebaseCalls';
import Toast from 'react-native-simple-toast';
import Header from '../../Components/Header';
import firestore from '@react-native-firebase/firestore';

// create a component
const ConsumerInter = props => {
  const [Vendor, setVendor] = useState({address: '', CNIC: '', cellNo: '+92'});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [userTown, setUserTown] = useState(['Loading Please Wait']);
  const [allTerritories, setAllTerritories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  useEffect(() => {
    getUserData();
    getAllBrands();
  }, []);
  const getUserData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    const data = JSON.parse(a);
    console.log('Response of user data', data);
    setUserData(JSON.parse(a));
    getUserAllTerritories(data.FloatId);
  };

  const getAllBrands = () => {
    Brands.getAllBrands()
      .then(resp => {
        console.log('Respoonse all Brands: ', resp._docs);
        const brands = resp._docs.map(item => item._data.name);
        console.log(brands);
        setAllBrands(brands);
      })
      .catch(err => console.log('this is error In All Brands', err))
      .finally(() => null);
  };

  const getUserAllTerritories = async floatId => {
    console.log(floatId);
    Territory.getFloatAllTerritories(floatId)
      .then(resp => {
        console.log('Respoonse getting user terretories data: ', resp._docs);
        const a = [];
        resp._docs.map(item => {
          a.push(item._data.TerritoryId);
        });
        setAllTerritories(a);
      })
      .catch(err => console.log('this is error getting user float data', err))
      .finally(() => null);
  };

  const getUserTowns = id => {
    Territory.getTerritory(id)
      .then(resp => {
        console.log('Respoonse getting user territory data: ', resp);
        setUserTown(resp._data.arr);
      })
      .catch(err =>
        console.log('this is error getting user territroy data', err),
      )
      .finally(() => setLoading(false));
  };

  const submitDataForm = () => {
    if (
      // Vendor.CNIC &&
      // Vendor.address &&
      Vendor.age &&
      Vendor.callStatus &&
      Vendor.cellNo &&
      Vendor.currentBrand &&
      Vendor.name &&
      Vendor.targetBrand &&
      Vendor.territoryName &&
      Vendor.town
    ) {
      setButtonLoading(true);
      const a = new Date();
      const d = a.toISOString();
      ConsumerForm.setConsumerDetails({
        ...Vendor,
        userID: userData.id,
        date: d.substring(0, 10),
      })
        .then(resp => {
          console.log('Respoonse Form Submit ', resp);
          props.navigation.navigate('Home');
        })
        .catch(err => console.log('this is error Form submit', err))
        .finally(() => setButtonLoading(false));
    } else {
      Toast.show('Please Fill All The Details');
    }
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
                      ? allTerritories.sort()
                      : ['Loading Wait']
                  }
                  defaultValue={Vendor.territoryName}
                  dropdownStyle={styles.dropdownStyle}
                  IconName={'angle-down'}
                  IconType={'font-awesome-5'}
                  onSelect={(index, value) => {
                    setVendor({...Vendor, territoryName: value});
                    getUserTowns(value);
                  }}
                />
              </View>
              <View style={styles.passwordView}>
                <DropDownComponent
                  Title={'Town'}
                  options={userTown}
                  defaultValue={'please Select'}
                  IconName={'angle-down'}
                  IconType={'font-awesome-5'}
                  dropdownStyle={styles.dropdownStyle}
                  onSelect={(index, value) => {
                    setVendor({...Vendor, town: value});
                  }}
                />
              </View>
              <View style={styles.passwordView}>
                <TextComponent
                  Title={'Name'}
                  placeholder="Enter your name"
                  value={Vendor.name}
                  onChangeText={text => setVendor({...Vendor, name: text})}
                />
              </View>
              <View style={styles.passwordView}>
                <TextComponent
                  Title={'CNIC'}
                  placeholder="Enter your CNIC"
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
                  placeholder="Enter your number"
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
                  placeholder="Enter your age"
                  value={Vendor.age}
                  keyboardType={'numeric'}
                  onChangeText={text => setVendor({...Vendor, age: text})}
                />
              </View>
              <View style={styles.textView}>
                <TextComponent
                  Title={'Address'}
                  placeholder="Enter your address"
                  value={Vendor.address}
                  onChangeText={text => setVendor({...Vendor, address: text})}
                />
              </View>
              <View style={styles.passwordView}>
                <DropDownComponent
                  Title={'Current Brand'}
                  options={allBrands}
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
                  options={['Capstan', 'Morven', 'Gold Flake']}
                  defaultValue={'please Select'}
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
                  defaultValue={'please Select'}
                  IconName={'chevron-down'}
                  IconType={'feather'}
                  dropdownStyle={styles.dropdownStyle}
                  onSelect={(index, value) => {
                    setVendor({...Vendor, callStatus: value});
                  }}
                />
              </View>
              <ButtonComponent
                text="Submit"
                isLoading={buttonLoading}
                onPress={() => submitDataForm()}
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
});

//make this component available to the app
export default ConsumerInter;
