import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from '@unimodules/core';

export default class SelectBorder extends Component {
    static defaultProps = {
        value: null,
        onValueChange: value => {}
    }

    render() {
        const placeholder = {
            label: this.props.label,
            value: null,
            color: '#bf245a',
          };
        return (
            <View style={{ ...styles.container, ...this.props.style }}>
                <Text style={styles.labelStyle}>{this.props.label}</Text>
                <View style={styles.wrapSelect}>
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={this.props.choice.filter((item, nextItem) => item[this.props.type] !== "" && item[this.props.type] !== null && this.props.choice.indexOf(item[this.props.type]) !== nextItem[this.props.type]).map(item => {
                            return {
                                key: item.id,
                                label: item[this.props.type],
                                value: item[this.props.type]
                              }
                        })}
                        onValueChange={value => this.props.onValueChange(value, this.props.type)}
                        style={{
                            ...styles.pickerSelectStyles,
                            iconContainer: {
                                top: Platform.OS === "android" ? 10 : -5,
                                right: Platform.OS === "android" ? 12 : 2,
                            },
                        }}
                        value={this.props.value}
                        useNativeAndroidPickerStyle
                        textInputProps={{ underlineColor: 'yellow' }}
                        Icon={() => {
                            return <Ionicons name="md-arrow-dropdown" size={24} color="#ee813c" />;
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: "column"
    },
    wrapSelect: {
        borderWidth: 1,
        borderColor: '#ee813c',
        borderRadius: 2,
    },
    pickerSelectStyles: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 180,
        color: 'black',
        paddingRight: 30,
    },
    labelStyle: { 
        paddingLeft: 10, 
        color: "gray" 
    }
})