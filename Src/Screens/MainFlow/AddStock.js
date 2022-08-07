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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {ActivityIndicator} from 'react-native-paper';
import {postData} from '../Database/ApiCalls';
import axios from 'axios';
import {Floats, userbrands} from '../../Constants/UserConstants';
// create a component
const a = new Date();
const b = a.toISOString();
const c = b.substring(0, 10);

const AddStock = props => {
  const [stock, setstock] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [userBrandData, setUserBrandData] = useState();
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    let b = JSON.parse(a);
    setUserData(b);
    const floatCheck = Floats.findIndex(item => item.id == b.floatId);
    setUserBrandData(Floats[floatCheck].brand);
  };

  console.log(userData);
  const setStockData = () => {
    if (stock == '') {
      Toast.show('Please Enter Stock Details First');
    } else {
      const data = {
        brand: userBrandData,
        CreatedAt: '2022-08-03T18:02:11.681Z',
        date: c,
        stockLoad: stock,
        UserId: `${userData.id}`,
      };
      console.log('form data', data);
      axios.defaults.headers['Content-Type'] = 'application/json';
      postData
        .addStock(data)
        .then(res => {
          console.log('response getting stock load', res);
          Toast.show('Stock Addedd Successfully!');
          props.navigation.navigate('Stackload');
        })
        .catch(err => console.log('error getting stock load', err))
        .finally(() => setLoading(false));
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
          <Text style={styles.brandName}>{userBrandData}</Text>
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
