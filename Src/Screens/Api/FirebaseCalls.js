import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
//collection == add
//documnt == set
export const Users = {
  getSingleUser: async id =>
    await firestore().collection('user').doc(`${id}`).get(),
  markAttendance: async data =>
    await firestore()
      .collection('Attendance')
      .doc(`${data.id}`)
      .collection(data.date)
      .add(data),
};
export const Float = {
  getUserFloat: async floatId =>
    await firestore().collection('Float').doc(`${floatId}`).get(),
  setFloatCleanliness: async (floatId, data) =>
    await firestore().collection('Cleanliness').doc(`${floatId}`).set(data),
  submitFloatForm: async (floatId, data) =>
    await firestore().collection('Feedback').doc(`${floatId}`).set(data),
};

export const Territory = {
  getTerritory: async id =>
    await firestore().collection('Territory').doc(id).get(),
};
export const Brands = {
  getAllBrands: async () => await firestore().collection('Brands').get(),
};

export const StockLoad = {
  getStock: async () => await firestore().collection('StockLoad').get(),
  setStock: async () =>
    await firestore().collection('StockLoad').doc('GSI').set({
      Balance: 2000,
      brand: 'GSI',
      id: 3,
      load: 2000,
      opening: 3000,
      sale: 100,
    }),
};

export const ConsumerForm = {
  setConsumerDetails: async (userId, date, data) =>
    await firestore()
      .collection('ConsumerDataForm')
      .doc(`${userId}`)
      .collection(`${date}`)
      .add(data),
};

export const FileUplaod = {
  upload: async data => {
    const fdata = new FormData();
    fdata.append('fileName', data.uri);
    // fdata.append('name', data.fileName);
    // fdata.append('type', data.type);
    console.log(fdata);
    await axios
      .post(
        'https://azurefileuploadingapi.conveyor.cloud/api/FileUpload/UploadFileOnAzure',
        fdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data; charset=utf-8',
            accept: 'application/json',
          },
        },
      )
      .then(resp => console.log('this is resp', resp))
      .catch(err => console.log('this is error',err));
    // fetch({
    //   url:"https://azurefileuploadingapi.conveyor.cloud/api/FileUpload/UploadFileOnAzure",
    //   method: 'post',
    //   data: fdata,
    //   headers: {
    //     'Content-Type': 'multipart/form-data; charset=utf-8',
    //     accept: 'application/json',
    //   },
    // }).then(res => console.log(res));
  },
};
