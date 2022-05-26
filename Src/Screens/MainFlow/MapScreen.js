//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import Theme from '../../Utils/Theme';
// create a component
const MapScreen = (props) => {
    return (
        <View style={styles.container}>
            <MapView
            style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
            
            </MapView>
            <TouchableOpacity
                 style={{position:'absolute',bottom:Theme.screenHeight/20,alignSelf:'center',backgroundColor:'#d3dbd5',
                borderRadius:20}}
                 onPress={() => props.navigation.navigate('SelectImage')}>
                <Text style={{ color: '#000',padding:Theme.screenHeight/45 }}>Get Started</Text>
            </TouchableOpacity>
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    map:{
        ...StyleSheet.absoluteFillObject
    }
});

//make this component available to the app
export default MapScreen;
