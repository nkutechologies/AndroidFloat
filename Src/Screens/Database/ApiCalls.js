import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {instance} from './instance';
const {baseURL} = instance;

export const configureAxiosHeaders = async () => {
  axios.defaults.headers['Expires'] = '2500';
  axios.defaults.headers['Pragma'] = 'no-cache';
  axios.defaults.headers['Cache-Control'] = 'no-cache';
};

const requests = {
  post: (url, body) => axios.post(`${baseURL}${url}`, body),
  put: (url, body) => axios.put(`${baseURL}${url}`, body),
  get: url => axios.get(`${baseURL}${url}`),
  delete: url => axios.delete(`${baseURL}${url}`),
};

export const postData = {
  postAttendance: body => requests.post('Attendence/Post', body),
  addStock: body => requests.post('StockLoad/Post', body),
  editStock: body => requests.post('StockLoad/Edit', body),
  floatCleanliness: body => requests.post('CleanlinessFileUpload/Post', body),
  feedBackForm: body => requests.post('FeedBack/Post', body),
  postInterception: body => requests.post('ConsumerDataForm/Post', body),
};
export const Auth = {
  loginUser: body => requests.post('Authentication/Login', body),
};

export const getData = {
  getStockReport: data => requests.post('ConsumerDataForm/Get', data),
  getStock: body => requests.post('StockLoad/Get', body),
  getStockDetails: body => requests.post('StockLoad/GetStockLoadsList', body),
};
