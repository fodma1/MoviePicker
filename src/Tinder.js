import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from './swipe-cards/SwipeCards';

class Card extends Component {
  constructor(props) {
      super(props);
  }
  _getImageUrl(url) {
    return url.replace('{{w}}x{{h}}', '260x371');
  }
  render() {
    return (
      <View style={[styles.card]}>
        <Text>{this.props.title}</Text>
        <Image
          style={{width: 260, height: 371}}
          source={{uri: this._getImageUrl(this.props.imgUrl)}}
        />
        {/*<Text>{ this.state.url }</Text>
        <Text>{ this.props.imgUrl }</Text>*/}
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

const Cards = [
  {text: 'Tomato', backgroundColor: 'red'},
  {text: 'Aubergine', backgroundColor: 'purple'},
  {text: 'Courgette', backgroundColor: 'green'},
  {text: 'Blueberry', backgroundColor: 'blue'},
  {text: 'Umm...', backgroundColor: 'cyan'},
  {text: 'orange', backgroundColor: 'orange'},
]

export default class Tinder extends Component {
  static navigationOptions = {
    title: 'Movie Tinder',
  };
  constructor(props) {
      super(props);
      this.state = {
        cards: Cards,
        movies: [],
      }
  }

  componentDidMount() {
    // Fetch Data
    this._fetchData();
  }

  _fetchData() {
    fetch('http://localhost:3000/movies/', {
      method: 'GET'
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({movies: data});
    });
  }

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.movies}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
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