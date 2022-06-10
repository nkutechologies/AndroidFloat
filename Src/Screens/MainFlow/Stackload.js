import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Theme from '../../Utils/Theme';
import Header from '../../Components/Header';
import {StockLoad} from '../Api/FirebaseCalls';
const Stackload = props => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getStockData();
  }, []);

  const getStockData = () => {
    setLoading(true);
    // StockLoad.setStock()
    StockLoad.getStock()
      .then(res => {
        console.log('response getting stock load', res._docs);
        const stockDetails = res._docs.map(item => item._data);
        setData(stockDetails);
      })
      .catch(err => console.log('error getting stock load', err))
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Stock"
        backIcon={true}
        backIconPress={() => props.navigation.goBack()}
        rightIcon={"pluscircleo"}
        type={'antdesign'}
        rightIconPress={()=>props.navigation.navigate('AddStock')}
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
              <Text style={styles.data}>{item.opening}</Text>
              <Text style={styles.data}>{item.load}</Text>
              <Text style={styles.data}>{item.sale}</Text>
              <Text style={styles.data}>{item.Balance}</Text>
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
