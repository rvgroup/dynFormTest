import { StyleSheet } from 'react-native';

import * as assetsStyle from './../../assets/styles';

var styles = StyleSheet.create({
    controlContainer: {
        margin: 40
    },
    input: {
        paddingBottom: -5,
        fontFamily: assetsStyle.fontFamily,
        fontSize: assetsStyle.fontSizeLarge,
        color: assetsStyle.fontColorDark
    },
    inputContainer: {
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: assetsStyle.fontColorPlaceholder
    },
    inputOuterContainer: {
        marginBottom: 10
    },
    formContainer: {
        marginBottom: 20
    },
    error: {
        color: assetsStyle.baseColorRed
    },

    buttonContainer: {
        justifyContent: 'center'
    },
    enterButtonStyle: {
        backgroundColor: assetsStyle.baseColorOrange
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    backgroundStyles: {
        backgroundColor: assetsStyle.backgroundColor
    }
});

module.exports = styles;