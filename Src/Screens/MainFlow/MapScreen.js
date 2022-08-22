import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  hasPermissionIOS,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ButtonComponent from '../../Components/ButtonComponent';
import Theme from '../../Utils/Theme';
import Geolocation from 'react-native-geolocation-service';
import Header from '../../Components/Header';
import Toast from 'react-native-simple-toast';

const MapScreen = props => {
  const [lat, setlat] = useState(0);
  const [lng, setlng] = useState(0);

  useEffect(() => {
    mapView();
  }, []);

  const mapView = async () => {
    Geolocation.getCurrentPosition(position => {
      // console.log("position",position);
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      //   console.log('===>', lng);
      setlat(lat);
      setlng(lng);
    });
  };

  const markAttendance = async () => {
    const date = new Date();
    const d = date.toISOString();
    const data = {
      latitude: lat,
      longitude: lng,
      date: d.substring(0, 10),
    };
    console.log('called attendacne marker', data);
    props.navigation.navigate('SelectImage', {
      data,
      location: props.route.params.location,
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
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker pinColor={'red'} coordinate={{latitude: lat, longitude: lng}} />
      </MapView>
      <Header
        backIcon={true}
        title="Location"
        backIconPress={() => props.navigation.goBack()}
      />

      <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
        <ButtonComponent text="Continue" onPress={() => markAttendance()} />
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
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
