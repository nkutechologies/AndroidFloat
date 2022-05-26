//import liraries
import React, { Component,useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import Theme from '../../Utils/Theme';
import TextComponent from '../../Components/TextComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
// create a component
const ConsumerInter = () => {
    const [value, setValue] = useState(['italy', 'spain', 'barcelona', 'finland']);
    const [open, setOpen] = useState(false);
     const [items, setItems] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid', parent: 'spain'},
    {label: 'Barcelona', value: 'barcelona', parent: 'spain'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome', parent: 'italy'},

    {label: 'Finland', value: 'finland'}
  ]);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [see, setSee] = useState(true)
    return (
        <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
              <Card elevation={5} style={{alignItems:'center',backgroundColor:'#f0f0f0'
            }}>
               
               <View style={{height:Theme.screenHeight/11,justifyContent:'center'}}>
               <Text style={{fontSize:Theme.screenHeight/35,
                color:Theme.black,}}>Consumer Data Form</Text>
               </View>
                
               </Card>
               <View style={{
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

        theme="DARK"
        multiple={true}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
      />
    </View>
            <View style={{paddingHorizontal:Theme.screenWidth/20,marginVertical:Theme.screenHeight/30}}>
            <View style={styles.inputView}>
                    <TextComponent
                        Title={'Territor'}
                        source="mail"
                        placeholder="Enter your email"
                        value={username}
                        // onChangeText={(username) => setUserName(username)}
                        name={'down'}
                        type={"antdesign"}
                        iconPress={() => setSee(!see)}
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextComponent
                        Title={'Down'}
                        iconPress={() => setSee(!see)}
                        // source={see ? "ios-eye-off-sharp" : "eye"}
                        placeholder="Enter your password"
                        value={password}
                        secureTextEntry={see ? true : false}
                        onChangeText={(password) => setPassword(password)}
                        name={'down'}
                        type={"antdesign"}
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextComponent
                        Title={'Name'}
                        iconPress={() => setSee(!see)}
                        // source={see ? "ios-eye-off-sharp" : "eye"}
                        placeholder="Enter your name"
                        value={password}
                        secureTextEntry={see ? true : false}
                        onChangeText={(password) => setPassword(password)}
                      
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextComponent
                        Title={'CNIC'}
                        iconPress={() => setSee(!see)}
                        // source={see ? "ios-eye-off-sharp" : "eye"}
                        placeholder="Enter your cnic"
                        value={password}
                        secureTextEntry={see ? true : false}
                        onChangeText={(password) => setPassword(password)}
                      
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextComponent
                        Title={'Cell No'}
                        iconPress={() => setSee(!see)}
                        // source={see ? "ios-eye-off-sharp" : "eye"}
                        placeholder="Enter your number"
                        value={password}
                        secureTextEntry={see ? true : false}
                        onChangeText={(password) => setPassword(password)}
                      
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextComponent
                        Title={'Age'}
                        iconPress={() => setSee(!see)}
                        // source={see ? "ios-eye-off-sharp" : "eye"}
                        placeholder="Enter your age"
                        value={password}
                        secureTextEntry={see ? true : false}
                        onChangeText={(password) => setPassword(password)}
                      
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextComponent
                        Title={'Address'}
                        iconPress={() => setSee(!see)}
                        // source={see ? "ios-eye-off-sharp" : "eye"}
                        placeholder="Enter your address"
                        value={password}
                        secureTextEntry={see ? true : false}
                        onChangeText={(password) => setPassword(password)}
                      
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextComponent
                        Title={'Current Brand'}
                        iconPress={() => setSee(!see)}
                        // source={see ? "ios-eye-off-sharp" : "eye"}
                        placeholder="Enter your brand"
                        value={password}
                        secureTextEntry={see ? true : false}
                        onChangeText={(password) => setPassword(password)}
                        name={'down'}
                        type={"antdesign"}
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextComponent
                        Title={'Target Brand'}
                        iconPress={() => setSee(!see)}
                        // source={see ? "ios-eye-off-sharp" : "eye"}
                        placeholder="Enter your brand"
                        value={password}
                        secureTextEntry={see ? true : false}
                        onChangeText={(password) => setPassword(password)}
                        name={'down'}
                        type={"antdesign"}
                    />
                </View>
                <View style={styles.passwordView}>
                    <TextComponent
                        Title={'Product Status'}
                        iconPress={() => setSee(!see)}
                        // source={see ? "ios-eye-off-sharp" : "eye"}
                        placeholder="Enter your brand"
                        value={password}
                        secureTextEntry={see ? true : false}
                        onChangeText={(password) => setPassword(password)}
                        name={'down'}
                        type={"antdesign"}
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
    consumerTextStyle:{
        
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
});

//make this component available to the app
export default ConsumerInter;
