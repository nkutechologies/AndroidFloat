import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Routes from './Src/Navigation/Routes';
import {configureAxiosHeaders} from './Src/Screens/Database/ApiCalls';

const App = () => {
  configureAxiosHeaders();
  return (
    <>
      <Routes />
    </>
  );
};

export default App;
