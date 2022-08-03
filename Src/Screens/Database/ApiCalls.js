import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {instance} from './instance';
const {baseURL} = instance;

export const configureAxiosHeaders = async () => {
  let tok = await AsyncStorage.getItem('AuthToken');
  console.log('token ==>>', tok);
  axios.defaults.headers['Authorization'] = 'Bearer ' + tok;
  axios.defaults.headers['Expires'] = '2500';
  axios.defaults.headers['Pragma'] = 'no-cache';
  axios.defaults.headers['Cache-Control'] = 'no-cache';
  axios.defaults.headers['Content-Type'] = 'application/json';
};

const requests = {
  post: (url, body) => axios.post(`${baseURL}${url}`, body),
  put: (url, body) => axios.put(`${baseURL}${url}`, body),
  get: url => axios.get(`${baseURL}${url}`),
  getWithBody: (url, body) => axios.get(`${baseURL}${url}`, body),
  delete: url => axios.delete(`${baseURL}${url}`),
};

export const postData = {
  postAttendance: body => requests.post('Attendence/Post', body),
  addStock: body => requests.post('Stock/AddStock', body),
  editStock: body => requests.post('Stock/Edit', body),
  floatCleanliness: body => requests.post('CleanlinessFileUpload/Post', body),
  feedBackForm: body => requests.post('FeedBack/Post', body),
  postInterception: body => requests.post('ConsumerDataForm/Post', body),
};

export const getData = {
  getStockReport: data => requests.get('ConsumerDataForm/Get', data),
  getStock: body => requests.post('', body),

};
