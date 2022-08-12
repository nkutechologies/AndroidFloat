//import liraries
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Theme from '../../Utils/Theme';
import { ConsumerForm } from '../Api/FirebaseCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Header from '../../Components/Header';
import DatePicker from 'react-native-date-picker';
import { ActivityIndicator } from 'react-native-paper';
import { getData } from '../Database/ApiCalls';
import axios from 'axios';

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
  const [error, setError] = useState(false);
  const [ApiData, setApiData] = useState([]);

  useEffect(() => {
    getUserData(date);
    return () => data;
  }, []);

  const getUserData = async functionDate => {
    setLoading(true);
    let a = await AsyncStorage.getItem('AuthData');
    const data = JSON.parse(a);
    const d = {
      brandName: null,
      userId: `${data.id}`,
      dateFrom: null,
      dateTo: null,
    };
    axios.defaults.headers['Content-Type'] = 'application/json';
    await getData
      .getStockReport(d)
      .then(res => {
        console.log('res getting consumer data ', res);
        const consumed = res?.data?.data;
        if (consumed.length < 1) {
          Toast.show('No record Found');
          setError(true);
        } else {
          setApiData(consumed);
          calculate(consumed, functionDate);
        }
      })
      .catch(err => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const calculate = (consumed, functionDate) => {
    setData({
      monthIntercepts: 0,
      monthProductive: 0,
      todayProductive: 0,
      todayIntercepts: 0,
    });
    const dt = functionDate.toISOString();
    let a = {
      monthIntercepts: 0,
      monthProductive: 0,
      todayProductive: 0,
      todayIntercepts: 0,
    };
    consumed.map(item => {
      if (
        item?.callStatus == 'Productive' &&
        item?.date.split('T')[0] == dt.split('T')[0]
      ) {
        a = { ...a, todayProductive: a.todayProductive + 1 };
      } else if (
        item?.callStatus == 'Intercept' &&
        item?.date.split('T')[0] == dt.split('T')[0]
      ) {
        a = { ...a, todayIntercepts: a.todayIntercepts + 1 };
      } else if (
        item?.callStatus == 'Productive' &&
        item?.date.split('-')[1] == dt.split('-')[1]
      ) {
        a = { ...a, monthProductive: a.monthProductive + 1 };
      } else if (
        item?.callStatus == 'Intercept' &&
        item?.date.split('-')[1] == dt.split('-')[1]
      ) {
        a = { ...a, monthProductive: a.monthProductive + 1 };
      }
    });
    setData(a);
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
              calculate(ApiData, nd);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          {error ? (
            <View style={styles.summaryText}>
              <Text style={[styles.heading, { color: Theme.black }]}>
                No Data Found
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.summaryText}>
                <Text style={styles.heading}>
                  Summary Of Consumer{'\n'}Interactions/Productive
                </Text>
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
                      <Text style={styles.date}>
                        {monthNames[date.getMonth()]}
                      </Text>
                    </View>

                    <View style={styles.mainView}>
                      <View style={styles.containerView}>
                        <Text style={styles.heading}>Intercepts</Text>
                        <Text style={{ color: Theme.black }}>
                          {data.monthIntercepts + data.todayIntercepts}/
                          {data.monthIntercepts +
                            data.todayIntercepts +
                            data.monthProductive +
                            data.todayProductive}
                        </Text>
                      </View>
                      <View style={styles.containerView}>
                        <Text style={styles.heading}>Productive</Text>
                        <Text style={{ color: Theme.black }}>
                          {data.monthProductive + data.todayProductive}/
                          {data.monthIntercepts +
                            data.todayIntercepts +
                            data.monthProductive +
                            data.todayProductive}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* Daily Record*/}
                  <View style={styles.dateView}>
                    <View style={styles.dateSelectedView}>
                      <Text style={styles.date}>Daily</Text>
                      <Text style={styles.date}>{`${date.getDate()}/${date.getMonth() + 1
                        }/${date.getFullYear()}`}</Text>
                    </View>
                    <View style={styles.mainView}>
                      <View style={styles.containerView}>
                        <Text style={styles.heading}>Intercepts</Text>
                        <Text style={{ color: Theme.black }}>
                          {data.todayIntercepts}/
                          {data.monthIntercepts +
                            data.todayIntercepts +
                            data.monthProductive +
                            data.todayProductive}
                        </Text>
                      </View>
                      <View style={styles.containerView}>
                        <Text style={styles.heading}>Productive</Text>
                        <Text style={{ color: Theme.black }}>
                          {data.todayProductive}/
                          {data.todayIntercepts +
                            data.todayProductive}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
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
  heading: { fontSize: 20, fontWeight: 'bold', color: Theme.blue },
  date: { fontSize: 20, fontWeight: 'bold', color: Theme.black, marginTop: 10 },
});

//make this component available to the app
export default Summary;
