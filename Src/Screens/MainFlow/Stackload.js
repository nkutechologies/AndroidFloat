//import liraries
import React, { Component ,useState} from 'react';
import { View, Alert, Text, BackHandler, StyleSheet, ImageBackground, FlatList, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Images } from '../../Constants/Images';
import Theme from '../../Utils/Theme';

// create a component
const Stackload = () => {
    return (
        <View style={styles.container}>
               <Card elevation={5} style={{alignItems:'center',backgroundColor:'#f0f0f0'
            }}>
               
               <View style={{height:Theme.screenHeight/11,justifyContent:'center'}}>
               <Text style={{fontSize:Theme.screenHeight/35,
                color:Theme.black,}}>Stack Load</Text>
               </View>
                
               </Card>
            <Text>Stackload</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor:Theme.white,
    },
});

//make this component available to the app
export default Stackload;
