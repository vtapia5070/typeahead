import React, { Component } from 'react';
import SearchInput from '../Components/SearchInput/SearchInput';
import SearchSuggestions from '../Components/SearchSuggestions/SearchSuggestions';

import './App.scss';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchQuery: '',
      queryMatches: [],
      activeSuggestionIndex: null
    };
  }

  componentDidMount () {
    // add event listener to reset activeSuggestionIndex to null if the target is not a suggestion item
  }

  componentWillUnmount () {
    // unregister event listener
  }

  _getQueryMatches (searchStr) {
    return this.props.fruits.filter(fruit => {
      return fruit.toLowerCase().includes(searchStr.toLowerCase())
    })
  }

  _handleInputChange = (event) => {
    const { value } = event.target;

    this.setState({
      searchQuery: value,
      queryMatches: this._getQueryMatches(value)
    })
  }

  _handleSuggestionClick = (suggestion) => {
    this.setState({ searchQuery: suggestion })
  }

  _handleArrowPush = (event) => {
    const { activeSuggestionIndex, queryMatches } = this.state;
    const downArrowKey = 40;
    const upArrowKey = 38;

    let currentIndex;
    // console.log('activeSuggen', activeSuggestionIndex)
    if (event.keyCode === downArrowKey) {
      // if no items are focused or the last item is focus, focus on the first item
      if (activeSuggestionIndex === null || activeSuggestionIndex === queryMatches.length - 1) {
        currentIndex = 0;
      // otherwise, focus on next item in list
      } else {
        currentIndex = activeSuggestionIndex + 1;
      }
      console.log('downArrow index:', currentIndex)
      this.setState({ activeSuggestionIndex: currentIndex });
    }

    if (event.keyCode === upArrowKey) {      
      // do not change focus if up arrow is pushed and no items are focused
      if (activeSuggestionIndex === null) {
        currentIndex = activeSuggestionIndex;
      // if top item is focused, rotate to the bottom of the list
      } else if (activeSuggestionIndex === 0) {
        currentIndex = queryMatches.length - 1;
      // otherwise focus on the next item in the list
      } else {
        currentIndex = activeSuggestionIndex - 1;
      }
      console.log('upArrow index:', currentIndex)
      this.setState({ activeSuggestionIndex: currentIndex });
    }

    event.preventDefault();

  }

  render () {
    return (
      <div className="App">
        <header className="app-header">
          <SearchInput
            value={this.state.searchQuery}
            onChange={this._handleInputChange}
            onArrowPush={this._handleArrowPush}
          />
        </header>
        <section className="app-content">
          <SearchSuggestions
            suggestions={this.state.queryMatches}
            activeItemIndex={this.state.activeSuggestionIndex}
            onSuggectionClick={this._handleSuggestionClick}
          />
        </section>
      </div>
    );
  }
}

export default App;
