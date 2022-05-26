//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Theme from '../../Utils/Theme';
import TextComponent from '../../Components/TextComponent';
import DropDownComponent from '../../Components/DropDownComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import { useLinkProps } from '@react-navigation/native';
// create a component
const ConsumerInter = () => {
    const [Vendor, setVendor] = useState();
    const [name, setName] = useState();
    const [CNIC, setCNIC] = useState();
    const [age, setage] = useState();
    const [cellNo, setcellNo] = useState();
    const [address, setaddress] = useState();
    const [see, setSee] = useState(true)
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card elevation={5} style={{
                    alignItems: 'center', backgroundColor: '#f0f0f0'
                }}>

                    <View style={{ height: Theme.screenHeight / 11, justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: Theme.screenHeight / 35,
                            color: Theme.black,
                        }}>Consumer Data Form</Text>
                    </View>

                </Card>
                {/* <View style={{
      backgroundColor: '#171717',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15
    }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}

        // theme="DARK"
        // multiple={true}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
      />
    </View> */}

                <View style={{ paddingHorizontal: Theme.screenWidth / 20, marginVertical: Theme.screenHeight / 30 }}>
                    <View style={styles.inputView}>
                        <DropDownComponent
                            Title={'Territor'}
                            options={['Ahmad', 'Goraya']}
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
                            Title={'Down'}
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
                            onChangeText={(password) => setCNIC(password)}
                        />
                    </View>
                    <View style={styles.passwordView}>
                        <TextComponent
                            Title={'Cell No'}
                            placeholder="Enter your number"
                            value={cellNo}
                            onChangeText={(password) => setcellNo(password)}

                        />
                    </View>
                    <View style={styles.passwordView}>
                        <TextComponent
                            Title={'Age'}
                            placeholder="Enter your age"
                            value={age}
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
                            Title={'Productive Status'}
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
        width:Theme.screenWidth/1.5
    }
});

//make this component available to the app
export default ConsumerInter;
