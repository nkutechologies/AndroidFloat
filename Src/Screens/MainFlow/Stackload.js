import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Theme from '../../Utils/Theme';
import Header from '../../Components/Header';
import {StockLoad, ConsumerForm} from '../Api/FirebaseCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const Stackload = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();
  const [roleCheck, setRoleCheck] = useState(false);

  useEffect(() => {
    getUserData();
    getStockData();
    ConsumerData();
    return () => data;
  }, []);

  let userCheck = false;
  let classic = {prevStock: 0, loadStock: 0, sale: 0, prevSale: 0};
  let GSI = {prevStock: 0, loadStock: 0, sale: 0, prevSale: 0};
  const a = new Date();
  const b = a.toISOString();
  const c = b.substring(0, 10);

  const getUserData = async () => {
    let a = await AsyncStorage.getItem('AuthData');
    const b = JSON.parse(a);
    setUserData(b);
    userCheck = b.role.includes('Supervisor');
    setRoleCheck(userCheck);
  };

  const getStockData = async () => {
    await StockLoad.getStock()
      .then(res => {
        console.log('response getting stock load', res);
        const saleDetails = res._docs.map(item => item._data);
        saleDetails.map(item => {
          // console.log('these are the two items', parseInt(item.loadStock),saleDetails);
          if (item.brand == 'Classic') {
            if (c == item.date) {
              classic = {
                ...classic,
                brand: item.brand,
                loadStock: classic.loadStock + parseInt(item.stockLoad),
              };
            } else {
              classic = {
                ...classic,
                brand: item.brand,
                prevStock: classic.prevStock + parseInt(item.stockLoad),
              };
            }
          } else if (item.brand == 'GSI') {
            if (c == item.date) {
              console.log('====>>>', item);
              GSI = {
                ...GSI,
                brand: item.brand,
                loadStock: GSI.loadStock + parseInt(item.stockLoad),
              };
            } else {
              GSI = {
                ...GSI,
                brand: item.brand,
                prevStock: GSI.prevStock + parseInt(item.stockLoad),
              };
            }
          }
        });
      })
      .catch(err => console.log('error getting stock load', err))
      .finally(() => null);
  };

  const ConsumerData = () => {
    ConsumerForm.getConsumerData().then(res => {
      const consumeDetail = res._docs.map(item => item._data);
      console.log('response getting consume data', consumeDetail);
      consumeDetail.map(item => {
        if (item.callStatus == 'Productive') {
          if (item.targetBrand == 'Classic') {
            if (item.date == c) {
              classic = {
                ...classic,
                brand: 'Classic',
                sale: classic.sale + 1,
              };
            } else {
              classic = {
                ...classic,
                brand: 'Classic',
                prevSale: classic.prevSale + 1,
              };
            }
          } else if (item.targetBrand == 'GSI') {
            if (item.date == c) {
              GSI = {
                ...GSI,
                brand: 'GSI',
                sale: GSI.sale + 1,
              };
            } else {
              GSI = {
                ...GSI,
                brand: 'GSI',
                prevSale: GSI.prevSale + 1,
              };
            }
          }
        }
        setData([GSI, classic]);
      });
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
      <View style={{marginTop: Theme.screenHeight / 50}}>
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

      {loading ? null : (
        <FlatList
          refreshing={true}
          data={data}
          showsHorizontalScrollIndicator={false}
          //  numColumns={1}

          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View
              style={
                index % 2 == 0
                  ? {flexDirection: 'row', justifyContent: 'space-around'}
                  : {
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      backgroundColor: Theme.lightPink,
                    }
              }>
              <Text style={[styles.data, {fontWeight: '700'}]}>
                {item.brand}
              </Text>
              <Text style={styles.data}>{item.prevStock}</Text>
              <Text style={styles.data}>{item.loadStock}</Text>
              <Text style={styles.data}>{item.sale + item.prevSale}</Text>
              <Text style={styles.data}>
                {item.loadStock + item.prevStock - (item.sale + item.prevSale)}
              </Text>
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
});

export default Stackload;
