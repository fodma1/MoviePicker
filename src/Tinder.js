import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';

import SwipeCards from './swipe-cards/SwipeCards';
import { APIRoot, TMDBImageUrl, KeyNameSpace } from './consts';

class Card extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <View style={[styles.card]}>
        <Text>{this.props.title}</Text>
        <Image
          style={{width: 260, height: 371}}
          source={{uri: `${TMDBImageUrl}${this.props.poster_path}`}}
        />
      </View>
    )
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default class Tinder extends Component {
  static navigationOptions = {
    tabBarLabel: 'Movie Tinder',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/movie.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props) {
      super(props);
      this.state = {
        page: 1,
        movies: [],

        // Keep it simple
        likes: [],
        dislikes: [],
        wannaSee: [],
      }
  }

  componentDidMount() {
    // Fetch Data
    this._fetchData(this.state.page);
  }

  async _updateVotes() {
    try {
      var token = await AsyncStorage.getItem(`${KeyNameSpace}:token`);
    } catch(error) {
      console.log(`Getting otken failed with ${error}`);
    }

    fetch(`${APIRoot}/movies/rate`, {
      method: "POST",
      body: JSON.stringify({
        likes: this.state.likes,
        dislikes: this.state.dislikes,
        wannasee: this.state.wannaSee,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-auth': token,
      }),
    }).then(resp => resp.text())
    .then(console.log)
    .then(() => {
      this.setState({
        likes: [],
        dislikes: [],
        wannaSee: [],
      });
    })
  }

  _fetchData(page) {
    let url = `${APIRoot}/movies`;
    if (page) {
      url += `?page=${page}`;
    }
    fetch(url, {
      method: 'GET'
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({
        movies: data.results,
        page: page + 1,
      });
    });
  }

  handleYup (movie) {
    console.log(`Yup for ${movie.text}`);
    this.setState({likes: this.state.likes.concat([movie.id])});
  }
  handleNope (movie) {
    console.log(`Nope for ${movie.text}`);
    this.setState({dislikes: this.state.dislikes.concat([movie.id])});
  }
  handleMaybe (movie) {
    console.log(`Maybe for ${movie.text}`);
    this.setState({wannaSee: this.state.wannaSee.concat([movie.id])});
  }
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.movies.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.movies.length - index - 1} cards left.`);

      // Update DB;
      this._updateVotes();
      // Load more
      this._fetchData(this.state.page);
    }

  }

  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.movies}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={(d) => {this.handleYup(d);}}
        handleNope={(d) => {this.handleNope(d);}}
        handleMaybe={(d) => {this.handleMaybe(d);}}
        cardRemoved={(d) => {this.cardRemoved(d);}}
        onClickHandler={() => null}
        hasMaybeAction
      />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})