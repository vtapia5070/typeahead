import React, { Component } from 'react';
import SearchInput from '../Components/SearchInput/SearchInput';
import SearchSuggestions from '../Components/SearchSuggestions/SearchSuggestions';

import './App.scss';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchQuery: '',
      queryMatches: []
    };
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

  render () {
    return (
      <div className="App">
        <header className="app-header">
          <SearchInput onChange={this._handleInputChange}  value={this.state.searchQuery} />
        </header>
        <section className="app-content">
          <SearchSuggestions suggestions={this.state.queryMatches}/>
        </section>
      </div>
    );
  }
}

export default App;
