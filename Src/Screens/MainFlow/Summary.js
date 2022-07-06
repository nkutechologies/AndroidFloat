//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Theme from '../../Utils/Theme';
import {ConsumerForm} from '../Api/FirebaseCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Header from '../../Components/Header';
import DatePicker from 'react-native-date-picker';
import {ActivityIndicator} from 'react-native-paper';

// create a component
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const Summary = props => {
  const [data, setData] = useState({
    monthIntercepts: 0,
    monthProductive: 0,
    todayProductive: 0,
    todayIntercepts: 0,
  });
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData();
    return () => data;
  }, [date]);

  const getUserData = async () => {
    setLoading(true);
    setData({
      monthIntercepts: 0,
      monthProductive: 0,
      todayProductive: 0,
      todayIntercepts: 0,
    });
    let a = await AsyncStorage.getItem('AuthData');
    const data = JSON.parse(a);
    const dt = date.toISOString();
    const today = dt.substring(0, 10);
    console.log('called with date', dt);
    ConsumerForm.getUserConsumerData(data.id)
      .then(res => {
        console.log('res getting consumer data ', res);
        if (res._docs.length < 1) {
          Toast.show('No record Found');
        } else {
          res._docs.map(item => {
            if (
              item?._data?.callStatus == 'Productive' &&
              item?._data?.date == today
            ) {
              setData(prev => {
                return {...prev, todayProductive: prev.todayProductive + 1};
              });
            } else if (
              item?._data?.callStatus == 'Intercept' &&
              item?._data?.date == today
            ) {
              setData(prev => {
                return {...prev, todayIntercepts: prev.todayIntercepts + 1};
              });
            } else if (
              item?._data?.callStatus == 'Productive' &&
              item?._data?.date.split('-')[1] == today.split('-')[1]
            ) {
              setData(prev => {
                return {...prev, monthProductive: prev.monthProductive + 1};
              });
            } else if (
              item?._data?.callStatus == 'Intercept' &&
              item?._data?.date.split('-')[1] == today.split('-')[1]
            ) {
              setData(prev => {
                return {...prev, monthIntercepts: prev.monthIntercepts + 1};
              });
            }
          });
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Header
            title="Summary"
            backIcon={true}
            rightIcon={'calendar'}
            type={'font-awesome-5'}
            rightIconPress={() => setOpen(true)}
            backIconPress={() => props.navigation.goBack()}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={nd => {
              setDate(nd);
              setOpen(false);
              //   getUserData();
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <View style={styles.summaryText}>
            <Text style={styles.heading}>Summary Of Consumer Interactions</Text>
          </View>
          {/* Monthly Record*/}
          {loading ? (
            <View
              style={{
                height: Theme.screenHeight / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={Theme.blue} size={'small'} />
            </View>
          ) : (
            <>
              <View style={styles.dateView}>
                <View style={styles.dateSelectedView}>
                  <Text style={styles.date}>Monthly</Text>
                  <Text style={styles.date}>{monthNames[date.getMonth()]}</Text>
                </View>

                <View style={styles.mainView}>
                  <View style={styles.containerView}>
                    <Text style={styles.heading}>Intercepts</Text>
                    <Text style={{color: Theme.black}}>
                      {data.monthIntercepts + data.todayIntercepts}/100
                    </Text>
                  </View>
                  <View style={styles.containerView}>
                    <Text style={styles.heading}>Productive</Text>
                    <Text style={{color: Theme.black}}>
                      {data.monthProductive + data.todayProductive}/100
                    </Text>
                  </View>
                </View>
              </View>
              {/* Daily Record*/}
              <View style={styles.dateView}>
                <View style={styles.dateSelectedView}>
                  <Text style={styles.date}>Daily</Text>
                  <Text
                    style={
                      styles.date
                    }>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
                </View>
                <View style={styles.mainView}>
                  <View style={styles.containerView}>
                    <Text style={styles.heading}>Intercepts</Text>
                    <Text style={{color: Theme.black}}>
                      {data.todayIntercepts}/100
                    </Text>
                  </View>
                  <View style={styles.containerView}>
                    <Text style={styles.heading}>Productive</Text>
                    <Text style={{color: Theme.black}}>
                      {data.todayProductive}/100
                    </Text>
                  </View>
                </View>
              </View>
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
    backgroundColor: Theme.white,
  },
  summaryText: {
    width: Theme.screenWidth,
    alignItems: 'center',
    marginTop: Theme.screenHeight / 10,
  },
  mainView: {
    width: Theme.screenWidth / 1.1,
    flexDirection: 'row',
    paddingHorizontal: Theme.screenWidth / 10,
    paddingVertical: Theme.screenHeight / 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerView: {
    width: Theme.screenWidth / 3,
    height: Theme.screenHeight / 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 5,
    borderRadius: 10,
  },
  dateView: {
    alignItems: 'center',
    width: Theme.screenWidth / 1.05,
    alignSelf: 'center',
    marginTop: Theme.screenHeight / 30,
  },
  dateSelectedView: {
    flexDirection: 'row',
    width: Theme.screenWidth / 1.4,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  heading: {fontSize: 20, fontWeight: 'bold', color: Theme.blue},
  date: {fontSize: 20, fontWeight: 'bold', color: Theme.black, marginTop: 10},
});

//make this component available to the app
export default Summary;
