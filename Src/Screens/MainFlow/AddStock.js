//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import TextComponent from '../../Components/TextComponent';
import Theme from '../../Utils/Theme';
// create a component
const AddStock = props => {
  const [stock, setstock] = useState();
  return (
    <View style={styles.container}>
      <Header
        title="AddStock"
        backIcon={true}
        backIconPress={() => props.navigation.goBack()}
      />
      <View style={styles.mainView}>
        <TextInput
          value={stock}
          keyboardType={'numeric'}
          style={{
            height: Theme.screenHeight / 15,
            fontSize: Theme.screenHeight / 60,
            color: Theme.black,
            borderRadius: 10,
            alignItems: 'center',
          }}
          placeholder={'Please Enter New Stock Amount Here'}
          placeholderTextColor={'grey'}
          onChangeText={text => setstock({text})}
        />
        <TouchableOpacity style={styles.buttonView}>
          <Text style={styles.btnTextStyle}>add</Text>
        </TouchableOpacity>
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
  passwordView: {
    justifyContent: 'center',
    width: Theme.screenWidth / 2,
    alignSelf: 'center',
  },
  mainView: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: Theme.screenHeight / 10,
    width: Theme.screenWidth / 1.3,

    alignSelf: 'center',
    elevation: 5,
  },
  buttonView: {
    marginTop: Theme.screenHeight / 25,
    backgroundColor: Theme.blue,
    borderRadius: 5,
    marginBottom: Theme.screenHeight / 55,
    height: Theme.screenHeight / 20,
    width: Theme.screenWidth / 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    // marginVertical: Theme.screenHeight / 90,
    // marginHorizontal: Theme.screenWidth / 20,
    color: Theme.white,
  },
});

//make this component available to the app
export default AddStock;
