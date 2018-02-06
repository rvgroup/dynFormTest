import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Background, Header } from './../../components';
import * as assetsImage from './../../assets/images';

import baseStyles from './../../assets/styles/base';
import styles from './styles';

class Profile extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      fetching: false
    };
  }

  onBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={ baseStyles.flex }>
        <Header
          title='ПРОФИЛЬ'
          leftImage={ assetsImage.buttonBack }
          onLeftButtonClicked={ this.onBack.bind(this) } />
        <ScrollView>
          <View style={ styles.textStyle }>
            <Text>Профиль пользователя</Text>
          </View>
        </ScrollView>

        <Background backgroundStyles={ styles.backgroundStyle } />
      </View>
      );
  }
}

export default Profile;
