import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Platform, Text, Modal, ActivityIndicator } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DismissKeyboard from 'dismissKeyboard';

import { TextInput, Button, Background, CustomAlert } from './../../components';

import * as constants from './../../constants';
import * as assetsStyle from './../../assets/styles';

import * as tokenManager from '../../common/tokenManager';

import baseStyles from './../../assets/styles/base';
import styles from './styles';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            formData: null,
            formValues: {}
        };
    }

    componentWillMount() {
        var self = this;

        // Получаем конфигурацию формы
        this.props.screenProps.actions.getForm(
            formData => {
                console.log(formData);

                let cfg = {
                    ...self.state,
                    formData: formData,
                    fetching: false
                };

                self.setState(cfg);
            },
            error => {
                console.log(error);

                self.setState({
                    ...self.state,
                    formData: null,
                    fetching: false
                });

                CustomAlert.alert(error);
            }
        )
    }

    onLogin() {
        if (!this.formId) {
            return;
        }

        this.setState({
            ...this.state,
            fetching: true
        });

        let self = this;

        let formSubmitData = { };
        formSubmitData[this.formId] = this.state.formValues;

        this.props.screenProps.actions.login(
            formSubmitData, 
            resp => {
                self.setState({
                    ...self.state,
                    fetching: false
                });

                let accessToken = resp.accessToken;
                tokenManager.set(accessToken);

                self.props.navigation.navigate(constants.SCREEN_PROFILE_NAME);
            }, 
            error => {
                let state = {
                    ...self.state,
                    fetching: false
                };

                if (error.data) {
                    state.formData = error.data;
                } else {
                    CustomAlert.alert(error);
                }

                self.setState(state);
            });
    }

    getKey(name) {
        // ReactNative выдает предупреждение если у генерируемых элементов нет св-ва key
        this._ctlKeyId = (this._ctlKeyId || 0) + 1;

        return name + '_' + this._ctlKeyId;
    }

    renderErrors(errors) {
        if (errors) {
            let errorsMarkup = [];

            errors.forEach(
                error => {
                    errorsMarkup.push(
                        <Text style={ styles.error } key={ this.getKey('error') }>
                            { error }
                        </Text>
                    );
                }
            );

            return (
                <View style={ styles.errorsContainer } key='errorsContainer'>
                    { errorsMarkup }
                </View>);
        }

        return null;
    }

    renderControl(ctlData) {
        let stateCtlName = ctlData.short_name;
        let ctlValue = this.state.formValues[stateCtlName];

        switch (ctlData.input_type) {
            case 'text':
            case 'password':
                return (
                    <View style={ styles.inputOuterContainer } key = { ctlData.id + '_outer_container' }>
                        <View style={ styles.inputContainer } key = { ctlData.id + '_container' } >
                            <TextInput 
                                textStyle={ styles.input }
                                selectionColor={ assetsStyle.fontColorDark }
                                placeholder={ ctlData.label }
                                placeholderTextColor={ assetsStyle.fontColorPlaceholder }
                                editable = { !ctlData.disabled }
                                secureTextEntry = { ctlData.input_type == 'password' }
                                key = { ctlData.id }
                                name = { ctlData.short_name }
                                value = { ctlValue }
                                onChangeText={ text => {
                                    let state = {
                                        ...this.state
                                    };

                                    state.formValues[stateCtlName] = text;

                                    this.setState(state);
                                }}
                            />
                        </View>

                        { this.renderErrors(ctlData.errors) }
                    </View>
                );
        }

        // Не реализовано
        return null;
    }

    renderForm(formData) {
        if (!formData) {
            return null;
        }

        // Тег формы
        let formTag;
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formTag = formData[key];

                break;
            }
        }

        let self = this;
        let formElementsMarkup = [];

        if (formTag) {
            // Рендеринг дочерних элементов
            let children = formTag.children;

            if (children) {
                children.forEach(element => {
                    let elementMarkup = self.renderControl(element);

                    formElementsMarkup.push(elementMarkup);
                });
            }
        }

        this.formId = formTag ? formTag.id : null;

        return (
            <View style={ styles.formContainer }>
                { formElementsMarkup }

                { this.renderErrors(formTag.errors) }
            </View>);
    }

    render() {
        return (
          <TouchableWithoutFeedback onPress={ () => DismissKeyboard() }>
            <View style={ baseStyles.flex }>
                <View style={ styles.controlContainer }>
                    { this.renderForm(this.state.formData) }

                    <View style={ styles.buttonContainer }>
                            <Button
                                text='Вход'
                                buttonStyle={ styles.enterButtonStyle }
                                onPress={ this.onLogin.bind(this) } />
                    </View>
                </View>

                <Modal
                    animationType='none'
                    transparent={ true }
                    visible={ this.state.fetching }
                    onRequestClose={ () => { } }>
                    <View style={ styles.modalContainer }>
                        <ActivityIndicator size={ 'large' }/>
                    </View>
                </Modal>

                <Background backgroundStyles={ styles.backgroundStyles }/>
                { Platform.OS === 'ios' ? <KeyboardSpacer/> : <View/> }

            </View>
          </TouchableWithoutFeedback>
        );
    }
}