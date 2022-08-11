import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import Theme from '../../Utils/Theme';
import Header from '../../Components/Header';
import { Floats } from '../../Constants/UserConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { ActivityIndicator } from 'react-native-paper';
import { getData } from '../Database/ApiCalls';
import axios from 'axios';
const Stackload = props => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();
  // const [userBrand, setUserBrand] = useState();
  const [roleCheck, setRoleCheck] = useState(false);

  useEffect(() => {
    getUserData();
    return () => data;
  }, [isFocused]);

  let stockData = { prevStock: 0, loadStock: 0, sale: 0, prevSale: 0 };
  let userCheck = false;

  const a = new Date();
  const b = a.toISOString();
  const c = b.substring(0, 10);

  const getUserData = async () => {
    setLoading(true);
    let a = await AsyncStorage.getItem('AuthData');
    const b = JSON.parse(a);
    setUserData(b);
    userCheck = b.role.includes('Supervisor');
    setRoleCheck(userCheck);
    getBrandStock(b?.id);
    const floatCheck = Floats.findIndex(item => item.id == b.floatId);
    if (floatCheck != -1) {
      getBrandConsumerData(Floats[floatCheck].brand);
      console.log('flaot', Floats[floatCheck]);
    } else {
      Toast.show('Error Loading');
    }
  };

  const getBrandStock = async id => {
    console.log(id);
    const data = {
      date: c,
      userId: null,
    };
    console.log('payload==>>', data);
    axios.defaults.headers['Content-Type'] = 'application/json';
    await getData
      .getStock(data)
      .then(res => {
        console.log('sucess reponse ', res);
        const saleDetails = res.data.data;
        saleDetails.map(item => {
          const d = item?.date?.split('T')[0];
          if (c == d) {
            stockData = {
              ...stockData,
              loadStock: stockData.loadStock + parseInt(item?.stockLoad),
            };
          } else {
            stockData = {
              ...stockData,
              prevStock: stockData.prevStock + parseInt(item?.stockLoad),
            };
          }
        });
        console.log('this is result after calculating stock Loads', stockData);
      })
      .catch(err => {
        console.log('error getting stock data', err);
      });
  };

  const getBrandConsumerData = async brandName => {
    const data = {
      brandName: brandName,
      userId: null,
      dateFrom: null,
      dateTo: null,
    };
    axios.defaults.headers['Content-Type'] = 'application/json';
    await getData
      .getStockReport(data)
      .then(res => {
        console.log('response getting consumer data', res);
        const consumed = res?.data?.data;
        if (consumed.length > 0) {
          consumed.map(item => {
            if (item?.callStatus == 'Productive') {
              if (item?.date == c) {
                stockData = {
                  ...stockData,
                  brand: brandName,
                  sale: stockData.sale + 1,
                };
              } else {
                stockData = {
                  ...stockData,
                  brand: brandName,
                  prevSale: stockData.prevSale + 1,
                };
              }
            }
          });
          console.log('after calculation brand consumer data', stockData);
          setData([stockData]);
        } else {
          Toast.show('No Data Found');
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Stock"
        backIcon={true}
        // rightIcon={true}
        backIconPress={() => props.navigation.goBack()}
        rightIcon={roleCheck ? 'pluscircleo' : ''}
        type={'antdesign'}
        rightIconPress={() => props.navigation.navigate('AddStock')}
      />
      <View style={{ marginTop: Theme.screenHeight / 50 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: Theme.blue,
          }}>
          <View style={styles.boxes}>
            <Text style={styles.title}>Brand</Text>
          </View>
          <View style={styles.boxes}>
            <Text style={styles.title}>Opening</Text>
          </View>
          <View style={styles.boxes}>
            <Text style={styles.title}>Load Stock</Text>
          </View>
          <View style={styles.boxes}>
            <Text style={styles.title}>Sale</Text>
          </View>
          <View style={styles.boxes}>
            <Text style={styles.title}>Balance</Text>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={Theme.blue} size={'small'} />
        </View>
      ) : (
        <FlatList
          refreshing={true}
          data={data}
          showsHorizontalScrollIndicator={false}
          //  numColumns={1}
          onScrollBeginDrag={() => console.log('')}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <View
              style={
                index % 2 == 0
                  ? { flexDirection: 'row', justifyContent: 'space-around' }
                  : {
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    backgroundColor: Theme.lightPink,
                  }
              }>
              <Text style={[styles.data, { fontWeight: '700' }]}>
                {item.brand}
              </Text>
              <Text style={styles.data}>{item.prevStock}</Text>
              <Text style={styles.data}>{item.loadStock}</Text>
              <Text style={styles.data}>{item.sale + item.prevSale}</Text>
              <ScrollView horizontal={true} style={{ flexGrow: 0.55 }}>
                <Text style={styles.newData}>
                  {item.loadStock +
                    item.prevStock > 0 ? item.loadStock +
                    item.prevStock -
                  (item.sale + item.prevSale) : 0}
                </Text>
              </ScrollView>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  title: {
    color: Theme.black,
    fontWeight: 'bold',
    fontSize: Theme.screenHeight / 60,
  },
  boxes: {
    padding: Theme.screenHeight / 60,
    backgroundColor: Theme.blue,
  },
  data: {
    width: Theme.screenWidth / 6,
    textAlign: 'center',
    fontSize: Theme.screenHeight / 70,
    color: Theme.black,
    padding: Theme.screenHeight / 80,
    // marginLeft:Theme.screenWidth/90
  },
  newData: {
    textAlign: 'center',
    fontSize: Theme.screenHeight / 70,
    color: Theme.black,
    padding: Theme.screenHeight / 80,
    // marginLeft:Theme.screenWidth/90
  },
});

export default Stackload;
