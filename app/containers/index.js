﻿import React, { Component } from 'react';
import { Platform, BackHandler, View, SafeAreaView, StatusBar } from 'react-native';

import { AppNavigator } from './navigator';

import * as constants from './../constants';

import styles from './styles';

export default class Index extends Component {
  constructor(props) {
    super(props);

    this.notificationRoute = null;

    this.state = {
      isReady: false,
      startScreen: constants.SCREEN_LOGIN,
      routeStack: null
    };
  }

  componentWillMount() {
    var self = this;

    self.setState({
      ...self.state,
      isReady: true
    }, () => {
      self.nav.dispatch({ type: 'Navigation/NAVIGATE', routeName: constants.SCREEN_LOGIN_NAME });
    });
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
  }

  onBackAndroid() {
    return true;
  }

  renderScene(route, navigator) {
    this.nav = navigator;
    const {actions} = this.props;

    switch (route.id) {
      case constants.SCREEN_LOGIN:
        return (
          <Login
            login={ actions.login }
            navigator={ navigator } />
        );

      case constants.SCREEN_PROFILE:
        return (
          <Profile
            currentProfile={ this.props.currentProfile }
            navigator={ navigator } />
        );
    }
  }

  configureScene() {
    return {
      ...Navigator.SceneConfigs.PushFromRight,
      gestures: {}
    };
  }

  render() {
    if (!this.state.isReady) {
      return Platform.OS === 'android' ? (<View/> ) : ( <StatusBar hidden={ true } /> );
    }

    return (
      <SafeAreaView style={ styles.safeArea }>
        <AppNavigator
          ref={ (navigator) => { this.nav = navigator; } }
          onNavigationStateChange={(prevState, currentState) => {
            this.currentRouteName = currentState.routes[currentState.index].routeName;
          }}
          screenProps={{
            actions: this.props.actions,
            currentProfile: this.props.currentProfile
          }}
        />
      </SafeAreaView>
    );
  }
}
