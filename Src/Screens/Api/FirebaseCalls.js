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
};

const data = {
  opening: 2000,
  brandId: 1,
  stockLoad: 1000,
  sale: 200,
  balance: 2800,
};
//StockLoad
export const StockLoad = {
  getStock: async () => await firestore().collection('StockLoad').get(),
  setStock: async (brand, userId, date, data) =>
    await firestore()
      .collection('StockLoad')
      .doc(`${brand}`)
      .collection('Users')
      .doc(`${userId}`)
      .collection(`${date}`)
      .doc()
      .set(data),
  getUserStock: async (brand, userId) =>
    await firestore()
      .collection('StockLoad')
      .doc(`${brand}`)
      .collection('Users')
      .doc(`${userId}`)
      .get(),

  updateUserTotalSales: async (brand, userId) =>
    await firestore()
      .collection('StockLoad')
      .doc(`${brand}`)
      .collection('Users')
      .doc(`${userId}`)
      .update({Total: firestore.FieldValue.increment(1)}),
};

export const ConsumerForm = {
  setConsumerDetails: async (userId, date, data) =>
    await firestore()
      .collection('ConsumerDataForm')
      .doc(`${userId}`)
      .collection(`${date}`)
      .add({...data, createdAt: firestore.FieldValue.serverTimestamp()}),
};
