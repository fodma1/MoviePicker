import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import Tinder from './Tinder.js'

const RouteMapper = (route, navigationOperations, onComponentRef) => {
  if (route.name === 'login') {
    return (
      <Text>This is home.</Text>
    );
  } else if (route.name === 'event') {
    return (
      // <Activity navigator={navigationOperations} direction={INCREASE}/>
      <Text>This is Event</Text>
    );
  } else if (route.name === 'tinder') {
    return (
      <Tinder style={{flex: 1}}/>
    );
  }
};

/*export default class MoviePicker extends Component {
  render() {
    return (
      // <Tinder style={{flex: 1}} />
      
      /*<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>*/

      /*<Navigator
        // Default to list route
        initialRoute={{name: 'tinder'}}
        // Use FloatFromBottom transition between screens
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
        // Pass a route mapper functions
        renderScene={RouteMapper}
      />
    );
  }
}*/

const MoviePicker = StackNavigator({
  Tinder: { screen: Tinder },
});

export default MoviePicker;
// export default class MoviePicker = StackNavigator({
//   Tinder: { screen: Tinder },
// });


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });