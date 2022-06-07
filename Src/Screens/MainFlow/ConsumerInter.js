//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Theme from '../../Utils/Theme';
import TextComponent from '../../Components/TextComponent';
import DropDownComponent from '../../Components/DropDownComponent';
import ButtonComponent from '../../Components/ButtonComponent';

import Header from '../../Components/Header';
// create a component
const ConsumerInter = (props) => {
    const [Vendor, setVendor] = useState();
    const [name, setName] = useState();
    const [CNIC, setCNIC] = useState();
    const [age, setage] = useState();
    const [cellNo, setcellNo] = useState();
    const [address, setaddress] = useState();
    const [see, setSee] = useState(true)
    return (
        <View style={styles.container}>
            <Header  backIcon={true} title="Consumer Data Form" backIconPress={()=>props.navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ paddingHorizontal: Theme.screenWidth / 20, marginVertical: Theme.screenHeight / 30 }}>
                    <View style={styles.inputView}>
                        <DropDownComponent
                            Title={'Territory'}
                            options={['Ahmad', 'Goraya','hghgg','jkjkj','l',]}
                            defaultValue={'please Select'}
                            dropdownStyle={styles.dropdownStyle}
                            IconName={'angle-down'}
                            IconType={'font-awesome-5'}
                            onSelect={(index, value) => { setVendor({}) }}
                        />
                        {/* <DropDownComponent
                        Title={'Territor'}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    /> */}
                    </View>
                    <View style={styles.passwordView}>
                        <DropDownComponent
                            Title={'Town'}
                            options={['Ahmad', 'Goraya']}
                            defaultValue={'please Select'}
                            IconName={'angle-down'}
                            IconType={'font-awesome-5'}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(index, value) => { setVendor({}) }}
                        />
                    </View>
                    <View style={styles.passwordView}>
                        <TextComponent
                            Title={'Name'}
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={(password) => setName(password)}

                        />
                    </View>
                    <View style={styles.passwordView}>
                        <TextComponent
                            Title={'CNIC'}
                            placeholder="Enter your cnic"
                            value={CNIC}
                            keyboardType={'numeric'}
                            onChangeText={(password) => setCNIC(password)}
                        />
                    </View>
                    <View style={styles.passwordView}>
                        <TextComponent
                            Title={'Cell No'}
                            placeholder="Enter your number"
                            value={cellNo}
                            keyboardType={'numeric'}
                            onChangeText={(password) => setcellNo(password)}

                        />
                    </View>
                    <View style={styles.passwordView}>
                        <TextComponent
                            Title={'Age'}
                            placeholder="Enter your age"
                            value={age}
                            keyboardType={'numeric'}
                            onChangeText={(password) => setage(password)}

                        />
                    </View>
                    <View style={styles.passwordView}>
                        <TextComponent
                            Title={'Address'}
                            placeholder="Enter your address"
                            value={address}
                            onChangeText={(password) => setaddress(password)}

                        />
                    </View>
                    <View style={styles.passwordView}>
                    <DropDownComponent
                            Title={'Current Brand'}
                            options={['Ahmad', 'Goraya']}
                            defaultValue={'please Select'}
                            IconName={'angle-down'}
                            IconType={'font-awesome-5'}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(index, value) => { setVendor({}) }}
                        />
                    </View>
                    <View style={styles.passwordView}>
                    <DropDownComponent
                            Title={'Target Brand'}
                            options={['Ahmad', 'Goraya']}
                            defaultValue={'please Select'}
                            IconName={'angle-down'}
                            IconType={'font-awesome-5'}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(index, value) => { setVendor({}) }}
                        />
                    </View>
                    <View style={styles.passwordView}>
                    <DropDownComponent
                            Title={'Call Status'}
                            options={['Ahmad', 'Goraya']}
                            defaultValue={'please Select'}
                            IconName={'chevron-down'}
                            IconType={'feather'}
                            dropdownStyle={styles.dropdownStyle}
                            onSelect={(index, value) => { setVendor({}) }}
                        />
                    </View>
                    <ButtonComponent
                        text="Submit"
                    // onPress={() => props.navigation.navigate('Home')}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: Theme.white,
    },
    consumerTextStyle: {

    },
    inputView: {
        // marginTop: Theme.screenHeight / 40,
        justifyContent: 'center',
        // paddingHorizontal:Theme.screenHeight/80,
    },
    passwordView: {
        justifyContent: 'center',
        // padding: 15,
    },
    dropdownStyle:{
        width:Theme.screenWidth/1.5,
        // borderColor:Theme.blue,
        elevation:8
        
    }
});

//make this component available to the app
export default ConsumerInter;
