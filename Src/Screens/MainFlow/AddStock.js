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
import {StockLoad, Brands, Float} from '../Api/FirebaseCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
// create a component
const AddStock = props => {
  const [stock, setstock] = useState('');
  const [userData, setUserData] = useState();
  const [userBrandData, setUserBrandData] = useState();
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
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
      .finally(() => null);
  };
  const setStockData = () => {
    if (stock == '') {
      Toast.show('Please Enter Stock Details First');
    } else {
      const a = new Date();
      const b = a.toISOString();
      const c = b.substring(0, 10);
      const data = {
        userId: userData.id,
        stockLoad: stock,
        date: c,
        brand: userBrandData.name,
      };
      StockLoad.setStock(data)
        .then(res => {
          console.log('response getting stock load', res);
          props.navigation.navigate('Home');
        })
        .catch(err => console.log('error getting stock load', err))
        .finally(() => null);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title="AddStock"
        backIcon={true}
        backIconPress={() => props.navigation.goBack()}
      />
      <View style={styles.mainView}>
        <TextInput
          value={stock}
          keyboardType={'numeric'}
          style={{
            height: Theme.screenHeight / 15,
            fontSize: Theme.screenHeight / 60,
            color: Theme.black,
            borderRadius: 10,
            alignItems: 'center',
          }}
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

    alignSelf: 'center',
    elevation: 5,
  },
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
});

//make this component available to the app
export default AddStock;
