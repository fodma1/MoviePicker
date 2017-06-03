import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import Tinder from './Tinder.js'


const MoviePicker = StackNavigator({
  Tinder: { screen: Tinder },
});

export default MoviePicker;
