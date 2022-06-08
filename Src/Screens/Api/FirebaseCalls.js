import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
