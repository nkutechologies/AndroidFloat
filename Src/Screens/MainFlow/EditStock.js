import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import Theme from '../../Utils/Theme';
import {StockLoad} from '../Api/FirebaseCalls';
import {getData, postData} from '../Database/ApiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

export default function EditStock(props) {
  const [data, setData] = useState();
  const {user, brand, date} = props.route.params;
  useEffect(() => {
    getStockData();
    return data;
  }, []);

  const getStockData = () => {
    const data = {
      date: date,
      userId: `${user?.id}`,
    };
    axios.defaults.headers['Content-Type'] = 'application/json';
    getData
      .getStock(data)
      .then(resp => {
        console.log('Respoonse getting user specific data: ', resp);
        setData(resp?.data?.data);
      })
      .catch(err => console.log('this is error getting user float data', err))
      .finally(() => null);
  };

  const updateEntry = item => {
    const data = {
      id: item.id,
      stockLoad: item.stockLoad,
    };
    axios.defaults.headers['Content-Type'] = 'application/json';
    postData
      .editStock(data)
      .then(resp => {
        console.log('Respoonse updating user specific data: ', resp);
        props.navigation.navigate('Stackload');
      })
      .catch(err => console.log('this is error getting user float data', err))
      .finally(() => null);
  };
  return (
    <View style={styles.container}>
      <Header
        title={`Edit ${brand.name} Stock`}
        backIcon={true}
        backIconPress={() => props.navigation.goBack()}
      />
      <View style={styles.tableHeadingView}>
        <Text style={styles.time}>Time</Text>
        <Text style={[styles.time, {width: Theme.screenHeight / 5}]}>
          Stock Update
        </Text>
        <Text style={styles.time}>Update</Text>
      </View>
      <FlatList
        refreshing={true}
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.createdAt}
        renderItem={({item, index}) => {
          const date = item?.createdAt.split('T')[0];
          return (
            <View
              style={
                index % 2 == 0
                  ? styles.mainView
                  : [styles.mainView, {backgroundColor: Theme.lightPink}]
              }>
              <Text style={styles.itemNumber}>{date}</Text>
              <TextInput
                placeholder={item?.stockLoad}
                onChangeText={text => {
                  const a = data.map(d => {
                    if (d.id == item.id) {
                      return {...d, stockLoad: text};
                    } else {
                      return d;
                    }
                  });
                  setData(a);
                }}
                value={item?.stockLoad}
                keyboardType={'decimal-pad'}
                style={styles.textInput}
                placeholderTextColor={Theme.black}
              />
              <TouchableOpacity onPress={() => updateEntry(item)}>
                <Text style={styles.button}>Update</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  mainView: {
    width: Theme.screenWidth,
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  time: {
    width: Theme.screenHeight / 12,
    textAlign: 'center',
    fontSize: Theme.screenHeight / 55,
    color: Theme.black,
  },
  tableHeadingView: {
    width: Theme.screenWidth,
    marginVertical: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Theme.blue,
  },
  textInput: {
    width: Theme.screenWidth / 2.5,
    textAlign: 'center',
    color: Theme.black,
    borderRadius: 10,
  },
  itemNumber: {
    color: Theme.black,
    borderRadius: 20,
    height: 20,

    // width: 20,
    // backgroundColor: Theme.black,
    // alignItems: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
  },
  button: {
    color: Theme.black,
    backgroundColor: Theme.blue,
    padding: 5,
    borderRadius: 5,
  },
});
