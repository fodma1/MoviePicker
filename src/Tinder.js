import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from './swipe-cards/SwipeCards';
import { APIRoot, TMDBImageUrl } from './consts';

class Card extends Component {
  constructor(props) {
      super(props);
  }
  _getImageUrl(url) {
    return url.replace('{{w}}x{{h}}', '260x371');
    // {/*source={{uri: this._getImageUrl(this.props.imgUrl)}}*/}
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
    title: 'Movie Tinder',
  };
  constructor(props) {
      super(props);
      this.state = {
        page: 1,
        movies: [],

        // Keep it simple
        likes: [],
        dislikes: [],
        wannasee: [],
      }
  }

  componentDidMount() {
    // Fetch Data
    this._fetchData(this.state.page);
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
    this.setState({likes: this.likes + [movie.id]});
  }
  handleNope (movie) {
    console.log(`Nope for ${movie.text}`);
    this.setState({dislikes: this.dislikes + [movie.id]});    
  }
  handleMaybe (movie) {
    console.log(`Maybe for ${movie.text}`);
    this.setState({wannasee: this.wannasee + [movie.id]});    
  }
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.movies.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.movies.length - index - 1} cards left.`);

      // Update DB;
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