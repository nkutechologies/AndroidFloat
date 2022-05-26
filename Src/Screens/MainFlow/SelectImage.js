//import liraries
import React, { Component, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Theme from '../../Utils/Theme';
import { Images } from '../../Constants/Images';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonComponent from '../../Components/ButtonComponent';
import Header from '../../Components/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'

const SelectImage = (props) => {
    const [ProfileImage, setProfileImage] = useState('');
    const pickImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                selectionLimit: 1,
            },
            async response => {
                setProfileImage(response.assets[0].uri);
                console.log('ye i pic', ProfileImage);
            },
        );
    };
    return (
        <View style={styles.container}>
            <Header backIcon={true} title="Uplaod Image" rightIcon="settings" />
            {ProfileImage && ProfileImage != '' ?
                <View>
                    <TouchableOpacity style={{ alignSelf: 'flex-end',marginRight:Theme.screenWidth/30,marginVertical:Theme.screenHeight/40 }}>
                    <AntDesign name="close" onPress={() => setProfileImage("")} size={Theme.screenHeight / 40}  color={Theme.black} />
                    </TouchableOpacity>
                    <Image source={{ uri: ProfileImage }} resizeMode="cover" style={{
                        height: Theme.screenHeight / 1.9
                        , width: Theme.screenWidth / 1
                    }} />
                </View>
                :
                <View style={{ justifyContent: 'center', flex: 1 }}>

                    <TouchableOpacity
                        onPress={() => pickImage()}>
                        <Image source={Images.camera} style={styles.imageStyle} />
                    </TouchableOpacity>
                </View>
            }
            <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
                <ButtonComponent
                    text="Submit"


                />
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
    cameralogo: {
        backgroundColor: Theme.blue
    },
    imageStyle: {
        alignSelf: 'center',
        height: Theme.screenHeight / 4.5
        , width: Theme.screenHeight / 4.5
    }
});

//make this component available to the app
export default SelectImage;
