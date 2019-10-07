import React from 'react';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { Slider } from 'react-native-elements';
import SelectBorder from './SelectBorder';

const bien = [
    {id: 1, bien: "Neuf" },
    {id: 2, bien:  "Ancien"}
];
const piece = [
    {id: 1, piece:  "1"},
    {id: 2, piece:  "2"},
    {id: 3, piece:  "3"},
    {id: 4, piece:  "4"},
];
const headerSearch = ({ choice, onValueChange, filter }) => {
    return (
        <ImageBackground 
            source={require('../../assets/images/marocback.png')} 
            style={styles.search}
            imageStyle={styles.imageStyle}
        >
            <View style={styles.container}>
                <SelectBorder
                    label="Adresse"
                    choice={choice}
                    type="address"
                    onValueChange={onValueChange}
                    value={filter.address}
                    style={styles.searchLevel1}
                />
                <SelectBorder
                    label="Programme"
                    choice={choice}
                    type="libelle"
                    onValueChange={onValueChange}
                    value={filter.libelle}
                    style={styles.searchLevel1}
                />
            </View>
            <View style={styles.container}>
                <SelectBorder
                    label="Bien"
                    choice={bien}
                    type="bien"
                    onValueChange={onValueChange}
                    value={filter.bien}
                    style={styles.searchAdress}
                />
                <SelectBorder
                    label="Type du bien"
                    choice={choice}
                    type="type_de_bien"
                    onValueChange={onValueChange}
                    value={filter.type_de_bien}
                    style={styles.searchType}
                />
                <SelectBorder
                    label="N° de pieces"
                    choice={piece}
                    type="piece"
                    onValueChange={onValueChange}
                    value={filter.piece}
                    style={styles.searchPiece}
                />
            </View>
            <View style={[styles.container, {paddingLeft: 20, paddingRight: 20, marginTop: 10}]}>
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                    <Text style={styles.labelStyle}>Budget: </Text>
                    <Slider 
                        value={filter.prix_min} onValueChange={value => onValueChange(value, "prix_min")}
                        minimumValue={0}
                        maximumValue={100000}
                        step={100}
                        thumbStyle={{ backgroundColor: "#bf245a" }}
                        minimumTrackTintColor="#bf245a"
                    />
                    <View style={styles.budgetStyle}>
                        <Text style={{ color: "#ee813c", fontWeight: "bold"}}>0 Dhs</Text>
                        <Text style={{ marginTop: -7, color: "#ee813c", fontWeight: "bold" }}>{
                            filter.prix_min >= 100000 ? "10 M" : filter.prix_min
                        } Dhs</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "space-between" 
    },
    search: {
        height: 240,
        width: "100%"
    },
    searchLevel1:{ 
        width: "40%",
        margin: 10 
    },
    searchAdress:{ 
        width: "5%",
        margin: 10 
    },
    searchType:{ 
        width: "60%",
        margin: 10 
    },
    searchPiece:{ 
        width: "10%",
        margin: 10 
    },
    imageStyle: { 
        width: "70%",
        marginLeft: "30%" 
    },
    labelStyle: { 
        paddingLeft: 10, 
        color: "gray" 
    },
    budgetStyle: { 
        flexDirection: "row", 
        justifyContent: "space-between" 
    }
})

export default headerSearch