//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import Theme from '../../Utils/Theme';
import { RadioButton } from 'react-native-paper';
import { Images } from '../../Constants/Images';
// create a component
const Cleanliness = () => {
    const [checked, setChecked] = useState('first');
    return (
        <View style={styles.container}>
            <View style={{ width: Theme.screenWidth }}>
                <View style={styles.radiobuttonView}>
                    <RadioButton
                        value="first"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                    />
                    <View style={{ width: Theme.screenWidth / 2 }}>
                        <Text style={styles.okTextStyle}>OK</Text>
                    </View>
                </View>
                <View style={styles.radiobuttonView}>
                    <RadioButton
                        value="second"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                    />
                    <View style={{ width: Theme.screenWidth / 2 }}>
                        <Text style={styles.okTextStyle}>Not OK</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <Image source={Images.camera} style={styles.imageStyle} />
                <Image source={Images.camera} style={styles.imageStyle} />
                <Image source={Images.camera} style={styles.imageStyle} />
                <Image source={Images.camera} style={styles.imageStyle} />
                </View>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.white,
    },
    okTextStyle: {
        fontSize: Theme.screenHeight / 30,
        color: Theme.black, marginLeft: 50,
        fontWeight:'bold'
    },
    radiobuttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Theme.screenWidth / 20
    },
    imageStyle:{
        height: Theme.screenHeight / 4.5
        , width: Theme.screenHeight /4.5
    }
});

//make this component available to the app
export default Cleanliness;
