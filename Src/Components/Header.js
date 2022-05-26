//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Theme from '../Utils/Theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const Header = ({title,rightIcon,backIcon,backIconPress}) => {
    return (
          <View  style={{backgroundColor:Theme.white,padding:Theme.screenHeight/60,elevation:10}}>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  {backIcon ?(
              <Ionicons name="arrow-back" onPress={backIconPress}  size={Theme.screenHeight/35} color={Theme.black}/>
                  ):(
                      <View></View>
                  )}
              <Text style={{color:Theme.black,fontWeight:'700',fontSize:Theme.screenHeight/40}}>{title}</Text>
              {!rightIcon=="" ?(
              <Ionicons name={rightIcon}  size={Theme.screenHeight/40} color={Theme.black}/>
              ):(
<View></View>
              )}
              </View>
          </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor:'lightgrey'
    },
});

//make this component available to the app
export default Header;
