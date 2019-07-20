import React, { Component } from 'react';
// import SearchInput from '../Components/SearchInput/SearchInput';
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
    // add event listener to reset activeSuggestionIndex to null if the target is not a suggestion item
    document.addEventListener('click', this._handleDocumentClick);
  }

  componentWillUnmount () {
    // unregister event listener
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
      this.setState({ isSuggestionListVisible: false, activeSuggestionIndex: null });
    }
  }

  _getQueryMatches (searchStr) {
    return this.props.fruits.filter(fruit => {
      return fruit.toLowerCase().includes(searchStr.toLowerCase()) &&
        fruit.toLowerCase() !== searchStr.toLowerCase();
    })
  }

  _handleInputChange = (event) => {
    const { value } = event.target;

    this.setState({
      searchQuery: value,
      queryMatches: this._getQueryMatches(value)
    });
  }

  _handleSuggestionClick = (event, suggestion) => {
    this.setState({
      searchQuery: suggestion,
      isSuggestionListVisible: false,
      activeSuggestionIndex: null
    });

    event.preventDefault();
  }

  _handleArrowPush = (event) => {
    const { activeSuggestionIndex, queryMatches } = this.state;
    const downArrowKey = 40;
    const upArrowKey = 38;

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

    event.preventDefault();
  }

  // NOTE: onClick (vs onFocus) is neccessary to prevent _handleDocumentClick
  // from executing
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
          <input
            className="search-input"
            ref={ref => this.inputRef = ref}
            value={this.state.searchQuery}
            onChange={this._handleInputChange}
            onKeyUp={this._handleArrowPush}
            onClick={this._handleInputFocus}
          />
        </header>
        <section className="app-content">
        {this.state.isSuggestionListVisible && (
          <SearchSuggestions
            suggestions={this.state.queryMatches}
            activeItemIndex={this.state.activeSuggestionIndex}
            onSuggectionClick={this._handleSuggestionClick}
          />
        )}
        </section>
      </div>
    );
  }
}

export default App;
