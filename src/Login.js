import React, { Component } from 'react';

import {
    AppRegistry,
    Text,
    AsyncStorage,
    View,
    TextInput,
    Button
} from 'react-native';
import { APIRoot, KeyNameSpace } from './consts'; 

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
          username: 'Matyasfodor',
          password: '123456',
          route: 'login'
      };
    }
    userLogin() {
        const payload = {
            username: this.state.username, 
            password: this.state.password
        };
        fetch(`${APIRoot}/users/${this.state.route}/`,
        {
            method: "POST",
            body: JSON.stringify(payload),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then((resp) => {
            console.log('parse stuff');
            var ret = resp.json()
            .then((d) => {console.log('json read', d); return d;}); 
            console.log('db3', ret);
            return ret;
        })
        .then((resp) => {
            if (this.state.route === 'signup') {
                this.setState({route: this.getOther()});
                this.userLogin(); 
            } else {
                console.log('Tokenke: ', resp.token);
                if(resp.token) {
                    try {
                        AsyncStorage.setItem(`${KeyNameSpace}:token`, resp.token)
                        .then(() => {
                            this.props.onLogin(resp.token);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
    });
    }
    getOther() {
        return (this.state.route === 'login') ? 'signup' : 'login';
    }
    toggleRoute(e) {
        this.setState({route: this.getOther()});
        e.preventDefault();
    }
    render() {
        return (
            <View style={{padding: 20}}>
                <Text style={{fontSize: 27}}>{"Welcome to Movie picker!"}</Text>
                <Text>Username</Text>
                    <TextInput 
                        placeholder='Username'
                        autoCorrect={false}
                        autoCapitalize='none'
                        autoFocus={true} 
                        value={this.state.username} 
                        style={{width: 300, height: 20, borderWidth: 1,}}
                        onChangeText={(text) => this.setState({ username: text })} />
                <Text>Password</Text>
                    <TextInput 
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false} 
                        secureTextEntry={true} 
                        value={this.state.password} 
                        style={{width: 300, height: 20, borderWidth: 1,}}
                        onChangeText={(text) => this.setState({ password: text })} />
                    <View style={{margin: 7}}/>
                    <Button onPress={(e) => this.userLogin(e)} title={this.state.route}/>
                    <Text style={{fontSize: 16, color: 'blue'}} onPress={(e) => this.toggleRoute(e)}>{this.getOther()}</Text>
            </View>
        );
    }
}