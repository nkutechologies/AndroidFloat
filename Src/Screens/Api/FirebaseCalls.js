import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const Users = {
  getSingleUser: async id =>
    await firestore().collection('user').doc(`${id}`).get(),
};
export const Territories = {
  getTerritory: async territoryId =>
    await firestore().collection('Territory').doc(`${territoryId}`).get(),
};
