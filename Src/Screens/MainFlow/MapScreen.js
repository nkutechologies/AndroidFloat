import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid, hasPermissionIOS } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ButtonComponent from '../../Components/ButtonComponent';
import Theme from '../../Utils/Theme';
import Geolocation from 'react-native-geolocation-service';

const MapScreen = (props) => {

    const [lat, setlat] = useState(0)
    const [lng, setlng] = useState(0)

    useEffect(() => {
        mapView();
    }, [])
    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }
        if (status === PermissionsAndroid.RESULTS.DENIED) {
            console.log('Location permission denied by user.');
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Location permission revoked by user.');
        }

        return false;
    };
    const mapView = async () => {
        const hasPermission = await hasLocationPermission();
        if (!hasPermission) {
            return;
        }
        Geolocation.getCurrentPosition(position => {
            // console.log("position",position);
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            //   console.log('===>', lng);
            setlat(lat);
            setlng(lng);
        });
    };
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                <Marker
                    pinColor={'red'}
                    coordinate={{ latitude: lat, longitude: lng }}
                />
            </MapView>
            <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
                <ButtonComponent text="Continue" onPress={()=> props.navigation.navigate('SelectImage')} />
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white,
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
});

export default MapScreen;
