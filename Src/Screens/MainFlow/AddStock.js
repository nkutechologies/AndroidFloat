//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import Theme from '../../Utils/Theme';
import {Brands, Float, newStockLoad} from '../Api/FirebaseCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {ActivityIndicator} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
// create a component
const a = new Date();
const b = a.toISOString();
const c = b.substring(0, 10);

const AddStock = props => {
  const [stock, setstock] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [userBrandData, setUserBrandData] = useState();
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    setLoading(true);
    let a = await AsyncStorage.getItem('AuthData');
    let b = JSON.parse(a);
    setUserData(b);
    console.log(b);
    getUserFloatData(b.FloatId);
  };
  const getUserFloatData = id => {
    Float.getUserFloat(id)
      .then(resp => {
        console.log('Respoonse getting user floa data: ', resp);
        getUserBrand(resp._data.brandId);
      })
      .catch(err => console.log('this is error getting user float data', err))
      .finally(() => null);
  };

  const getUserBrand = id => {
    Brands.getOneBrand(id)
      .then(resp => {
        console.log('Respoonse getting user brand data: ', resp);
        setUserBrandData(resp._data);
      })
      .catch(err => console.log('this is error getting user brand data', err))
      .finally(() => setLoading(false));
  };

  const setStockData = () => {
    if (stock == '') {
      Toast.show('Please Enter Stock Details First');
    } else {
      const data = {
        userId: userData.id,
        stockLoad: stock,
        date: c,
        brand: userBrandData.name,
        createdAt: new Date(),
      };
      newStockLoad
        .updateStockData(data)
        .then(res => {
          console.log('response getting stock load', res);
          Toast.show('Stock Addedd Successfully!');
          props.navigation.navigate('Stackload');
        })
        .catch(err => console.log('error getting stock load', err))
        .finally(() => null);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Add Stock"
        backIcon={true}
        backIconPress={() => props.navigation.navigate('Stackload')}
        rightIcon={userBrandData ? 'pen' : ''}
        type={'font-awesome-5'}
        rightIconPress={() =>
          props.navigation.navigate('EditStock', {
            brand: userBrandData,
            date: c,
            user: userData,
          })
        }
      />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={Theme.blue} size={'small'} />
        </View>
      ) : (
        <View style={styles.mainView}>
          <Text style={styles.brandName}>{userBrandData?.name}</Text>
          <TextInput
            value={stock}
            keyboardType={'numeric'}
            style={styles.inputField}
            placeholder={'Please Enter New Stock Amount Here'}
            placeholderTextColor={'grey'}
            onChangeText={text => setstock(text)}
          />
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() => setStockData()}>
            <Text style={styles.btnTextStyle}>add</Text>
          </TouchableOpacity>
        </View>
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
  passwordView: {
    justifyContent: 'center',
    width: Theme.screenWidth / 2,
    alignSelf: 'center',
  },
  mainView: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: Theme.screenHeight / 10,
    width: Theme.screenWidth / 1.3,
    paddingVertical: Theme.screenHeight / 30,
    alignSelf: 'center',
    elevation: 5,
  },
  brandName: {color: Theme.black, fontSize: 18, fontWeight: 'bold'},
  buttonView: {
    marginTop: Theme.screenHeight / 25,
    backgroundColor: Theme.blue,
    borderRadius: 5,
    marginBottom: Theme.screenHeight / 55,
    height: Theme.screenHeight / 20,
    width: Theme.screenWidth / 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    // marginVertical: Theme.screenHeight / 90,
    // marginHorizontal: Theme.screenWidth / 20,
    color: Theme.white,
  },
  inputField: {
    height: Theme.screenHeight / 15,
    fontSize: Theme.screenHeight / 60,
    color: Theme.black,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
});

//make this component available to the app
export default AddStock;
