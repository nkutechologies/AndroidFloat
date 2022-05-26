//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Theme from '../../Utils/Theme';
import { Images } from '../../Constants/Images';
import { Icon } from 'react-native-elements'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ButtonComponent from '../../Components/ButtonComponent';

// create a component
const FeedBackForm = () => {
    const [ProfileImage, setProfileImage] = useState('');
    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                // selectionLimit: 1,
            },
            async response => {
                setProfileImage(response.assets[0].uri);
                console.log('ye i pic', ProfileImage);
            },
        );
    };
    return (
        <View style={styles.container}>
            <Text style={{fontSize:Theme.screenHeight/30,color:Theme.black,fontWeight:'bold'}}>Upload Form Pic</Text>
            {ProfileImage && ProfileImage != '' ?
                <Image source={{ uri: ProfileImage }} style={{
                    height: Theme.screenHeight / 1.4
                    , width: Theme.screenHeight / 2.2
                }} /> 
               
                :
                <TouchableOpacity
                    onPress={() => pickImage()}
                >
                    <Image source={Images.camera} style={styles.imageStyle} />
                </TouchableOpacity>
            }
                   
            {/* <Icon
                    name='camera'
                    type='feather'
                    color='#517fa4'
                    size={Theme.screenHeight / 3}
                    onPress={() => pickImage()}
                /> */}
                     <ButtonComponent
                    text="Submit"
                    // onPress={() => props.navigation.navigate('Home')}
                />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Theme.white,
    },
    cameralogo: {
        backgroundColor: Theme.blue
    },
    imageStyle: {
        height: Theme.screenHeight / 3
        , width: Theme.screenHeight / 3
    }
});

//make this component available to the app
export default FeedBackForm;
