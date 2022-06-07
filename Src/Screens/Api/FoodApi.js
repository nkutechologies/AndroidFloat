import firebase from "react-native-firebase";

export function addFood(food,addCompelete){
firebase.firestore()
.collection('Foods')
.add({
    name:food.name,
    color:food.color,
    createdAt:firebase.firestore.FieldValue.serverTimestamp()
}).then((data) => addCompelete(data))
.catch((error) => console.log(error));
}
export async function getFoods(foodRetreived){
    var foodlist =[];
    var snapshot =  await firebase.firestore()
    .collection('Foods')
    .orderBy('createdAt')
    .get()
    snapshot.forEach((doc) => {
        foodlist.push(doc.data());

});
foodsRetreived(foodlist);
}