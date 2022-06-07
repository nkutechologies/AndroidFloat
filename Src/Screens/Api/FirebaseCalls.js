import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//collection == add
//documnt == set
export const Users = {
  getSingleUser: async id =>
    await firestore().collection('user').doc(`${id}`).get(),
};
export const Territories = {
  getTerritory: async territoryId =>
    await firestore().collection('Territory').doc(`${territoryId}`).get(),
};
export const Attendance = {
  markAttendance: async data =>
    await firestore().collection('Attendance').doc(`${data.id}`).set(data),

  // .collection(data.date)
  // .add(data),
};
