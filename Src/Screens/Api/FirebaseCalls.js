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
      .add({...data, createdAt: firestore.FieldValue.serverTimestamp()}),
};
//Flaots
export const Float = {
  getUserFloat: async floatId =>
    await firestore().collection('Float').doc(`${floatId}`).get(),
  setFloatCleanliness: async (floatId, data) =>
    await firestore()
      .collection('Cleanliness')
      .doc(`${floatId}`)
      .set({...data, createdAt: firestore.FieldValue.serverTimestamp()}),

  submitFloatForm: async (floatId, data, date) =>
    await firestore()
      .collection('Feedback')
      .doc(`${floatId}`)
      .collection(`${date}`)
      .add({...data, createdAt: firestore.FieldValue.serverTimestamp()}),
};
//Territories
export const Territory = {
  getTerritory: async id =>
    await firestore().collection('Territory').doc(id).get(),

  getFloatAllTerritories: async floatId =>
    await firestore()
      .collection('FloatTerritoryJunction')
      .where('floatId', '==', floatId)
      .get(),
};
//Brands
export const Brands = {
  getAllBrands: async () => await firestore().collection('Brands').get(),
  getOneBrand: async id =>
    await firestore().collection('Brands').doc(`${id}`).get(),
};
//StockLoad
export const StockLoad = {
  getStock: async () => await firestore().collection('StockLoad').get(),
  setStock: async data =>
    await firestore()
      .collection('StockLoad')
      .doc()
      .set({...data, createdAt: firestore.FieldValue.serverTimestamp()}),
  getSpecificStock: async (id, date) =>
    await firestore()
      .collection('StockLoad')
      .where('userId', '==', id)
      .where('date', '==', date)
      .get(),
  updateSpecificStock: async (docID, data) =>
    await firestore().collection('StockLoad').doc(docID).update(data),
};
//consumer form
export const ConsumerForm = {
  setConsumerDetails: async data =>
    await firestore()
      .collection('ConsumerDataForm')
      .doc()
      .set({...data, createdAt: firestore.FieldValue.serverTimestamp()}),

  getConsumerData: async () =>
    await firestore().collection('ConsumerDataForm').get(),
  getUserConsumerData: async id =>
    await firestore()
      .collection('ConsumerDataForm')
      .where('userID', '==', id)
      .get(),
};
