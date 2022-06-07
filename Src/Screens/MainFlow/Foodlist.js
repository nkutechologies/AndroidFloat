//import liraries
import React, { Component,useState,useEffect } from 'react';
import { View, Text, StyleSheet,TextInput,FlatList, TouchableOpacity } from 'react-native';
import {ListItem,Divider} from 'react-native-elements'
import { getFoods,addFood } from '../Api/FoodApi';
import firestore from '@react-native-firebase/firestore';

// create a component
const Foodlist = () => {
    useEffect(() => {
        getUser();// Runs ONCE after initial rendering
      }, []);
 
const getUser= async()=>{
const usersCollection =await firestore().collection('Territory').get();
console.log('ye aya user',usersCollection);
}
const addUser= async()=>{
const usersAdded =await
firestore()
.collection('user')
.doc('3')
.set({
  name: 'Ada Lovelace',
  age: 30,
})
.then(() => {
  console.log('User added!');
});
}
const updateUser= async()=>{
const usersAdded =await
firestore()
  .collection('user')
  .doc('3')
  .update({
    age: 31,
  })
  .then(() => {
    console.log('User updated!');
  });
}
    // colors=['red','black','blue']
    // const [State, setState] = useState('');
    // const [currentfoodItem, setcurrentfoodItem] = useState('null');
//  state ={
//      foodList:[],
//      currentfoodItem: null,
//  }
//  onFoodAdded=(food)=>{
//     console.log("Food Added");
//     console.log(food);
// }
// onFoodReceived = (Foodlist) =>{
//     console.log(foodList);
//     setstate(prevSatate =>({
//         foodList:prevSatate.foodList=foodList
//     }));
// }
// componentDidMount ();{
//     getFoods(onFoodReceived);
// }

    return (
        <View style={styles.container}>
            <TextInput
            style={StyleSheet.input}
            placeholder="add "
            // value={currentfoodItem}
            // onchangeText={(text)=>}
            />
           <TouchableOpacity onPress={()=>addUser()}>
           <Text>ADD</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>updateUser()}>
           <Text>update</Text>
           </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Foodlist;
