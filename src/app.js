import React, { Component } from 'react';
import { AppRegistry, Text, AsyncStorage } from 'react-native';

import {
  TabNavigator,
} from 'react-navigation';

import Friends from './Friends';
import KeyNameSpace from './consts';
import Login from './Login';
import Tinder from './Tinder';

const MoviePicker = TabNavigator({
  Tinder: { screen: Tinder },
  Friends: { screen: Friends },
});

class MainDispatch extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        user: null,
      };
  }

  componentDidMount() {
    this._authenticate();
  }

  _onLogin(token) {
    console.log('login: ', token);
    this.setState({user:token});
  }

  async _authenticate() {
    try {
      const token = await AsyncStorage.getItem(`${KeyNameSpace}:token`);
      if (token !== null) {
        this.setState({ user: token });
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({ loaded: true });
  }

  render() {
    if (this.state.loaded) {
      if (this.state.user) {
        return (<MoviePicker/>);
      } else {
        return (
          <Login onLogin={(d) => this._onLogin(d)}/>
        );
      }
    } else {
      return (<Text>Not loaded</Text>);
    }
  }
}

export default MainDispatch;
