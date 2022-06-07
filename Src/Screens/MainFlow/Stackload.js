import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import Theme from '../../Utils/Theme';
import Header from '../../Components/Header'
const Stackload = (props) => {
    const data = [
        {
            id: 0,
            brand: 'GT',
            opening: 3000,
            sale: 100,
            balance: 2020,
            load: 2000,
        },
        {
            id: 1,
            brand: 'CC',
            opening: 3000,
            sale: 100,
            balance: 2020,
            load: 2000,
        },
        {
            id: 2,
            brand: 'CC2B',
            opening: 3000,
            sale: 100,
            balance: 2020,
            load: 2000,
        },
        {
            id: 3,
            brand: 'GC',
            opening: 3000,
            sale: 100,
            balance: 2020,
            load: 2000,
        },
        {
            id: 4,
            brand: 'CC2B',
            opening: 3000,
            sale: 100,
            balance: 2020,
            load: 2000,
        },
        {
            id: 5,
            brand: 'GC',
            opening: 3000,
            sale: 100,
            balance: 2020,
            load: 2000,
        },

    ]

    return (
        <View style={styles.container}>
            <Header title="Stock" backIcon={true} backIconPress={() => props.navigation.goBack()} />
            <View style={{ marginTop: Theme.screenHeight / 50 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: Theme.blue }}>
                    <View style={styles.boxes}>
                        <Text style={styles.title}>Brand</Text>
                    </View>
                    <View style={styles.boxes}>
                        <Text style={styles.title}>Opening</Text>
                    </View>
                    <View style={styles.boxes}>
                        <Text style={styles.title}>Load Stock</Text>
                    </View>
                    <View style={styles.boxes}>
                        <Text style={styles.title}>Sale</Text>
                    </View>
                    <View style={styles.boxes}>
                        <Text style={styles.title}>Balance</Text>
                    </View>
                </View>
            </View>
            <FlatList
                refreshing={true}
                data={data}
                showsHorizontalScrollIndicator={false}
                //  numColumns={1}

                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <View style={index % 2 == 0 ? { flexDirection: 'row', justifyContent: 'space-around' } : { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Theme.lightPink }}>
                        <Text style={[styles.data, { fontWeight: '700' }]} >{item.brand}</Text>
                        <Text style={styles.data} >{item.opening}</Text>
                        <Text style={styles.data} >{item.load}</Text>
                        <Text style={styles.data} >{item.sale}</Text>
                        <Text style={styles.data} >{item.balance}</Text>
                    </View>
                )}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.white,
    },
    title: {
        color: Theme.black,
        fontWeight: 'bold',
        fontSize: Theme.screenHeight / 60
    },
    boxes: {
        padding: Theme.screenHeight / 60, backgroundColor: Theme.blue,

    },
    data: {
        width: Theme.screenWidth / 6,
        textAlign: 'center',
        fontSize: Theme.screenHeight / 70,
        color: Theme.black,
        padding: Theme.screenHeight / 80
        // marginLeft:Theme.screenWidth/90
    }
});

export default Stackload;
