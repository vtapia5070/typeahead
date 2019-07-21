import React, { Component } from 'react';
import SearchSuggestions from '../Components/SearchSuggestions/SearchSuggestions';

import './App.scss';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchQuery: '',
      queryMatches: [],
      activeSuggestionIndex: null,
      isSuggestionListVisible: true
    };
  }

  componentDidMount () {
    document.addEventListener('click', this._handleDocumentClick);
  }

  componentWillUnmount () {
    document.removeEventListener('click');
  }

  _handleDocumentClick = (event) => {
    const { activeSuggestionIndex } = this.state;
    if (!event.target.className.includes('suggestion-item') && activeSuggestionIndex !== null) {
      this.setState({ activeSuggestionIndex: null })
    }
     else if (
      !event.target.className.includes('search-suggestions-item') &&
      event.target !== this.inputRef
    ) {
      this._resetSearchSuggestions(this.state.searchQuery);
    }
  }

  _resetSearchSuggestions (query) {
    this.setState({
      searchQuery: query,
      isSuggestionListVisible: false,
      activeSuggestionIndex: null,
      queryMatches: this._getQueryMatches(query)
    });
  }

  _getQueryMatches (searchStr) {
    return this.props.fruits.filter(fruit => {
      return fruit.toLowerCase().includes(searchStr.toLowerCase()) &&
        fruit.toLowerCase() !== searchStr.toLowerCase();
    })
  }

  _handleInputChange = (event) => {
    const { value } = event.target;
    const matches = value.length ? this._getQueryMatches(value) : [];
    
    this.setState({
      searchQuery: value,
      queryMatches: matches,
      isSuggestionListVisible: true
    });
  }

  _handleSuggestionClick = (event, suggestion) => {
    this._resetSearchSuggestions(suggestion)

    event.preventDefault();
  }

  _handleKeyUp = (event) => {
    const { activeSuggestionIndex, queryMatches } = this.state;
    const downArrowKey = 40;
    const upArrowKey = 38;
    const enterKey = 13;

    let currentIndex;
    if (event.keyCode === downArrowKey) {
      // if no items are focused or the last item is focus, focus on the first item
      if (activeSuggestionIndex === null || activeSuggestionIndex === queryMatches.length - 1) {
        currentIndex = 0;
      // otherwise, focus on next item in list
      } else {
        currentIndex = activeSuggestionIndex + 1;
      }
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
      this.setState({ activeSuggestionIndex: currentIndex });
    }

    if (event.keyCode === enterKey) {
      this._resetSearchSuggestions(this.state.queryMatches[this.state.activeSuggestionIndex]);
    }

    event.preventDefault();
  }

  // NOTE: onClick (vs onFocus) is neccessary to prevent _handleDocumentClick
  // from executing and resetting state
  _handleInputFocus = (event) => {
    if (this.state.searchQuery.length) {
      this.setState({
        isSuggestionListVisible: true,
        queryMatches: this._getQueryMatches(this.state.searchQuery)
      });
    }

    event.preventDefault();
  }

  render () {
    return (
      <div className="App">
        <header className="app-header">
          <div className="title">Typeahead</div>
        </header>
        <section className="app-content">
          <input
            className="search-input"
            ref={ref => this.inputRef = ref}
            value={this.state.searchQuery}
            onChange={this._handleInputChange}
            onKeyUp={this._handleKeyUp}
            onClick={this._handleInputFocus}
          />
          {this.state.isSuggestionListVisible &&
            !!this.state.queryMatches.length && (
            <SearchSuggestions
              suggestions={this.state.queryMatches}
              activeItemIndex={this.state.activeSuggestionIndex}
              onSuggectionClick={this._handleSuggestionClick}
              searchQuery={this.state.searchQuery}
            />
          )}
        </section>
      </div>
    );
  }
}

export default App;
