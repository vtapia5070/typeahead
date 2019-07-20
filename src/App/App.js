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

  _getQueryMatches () {
    return this.props.fruits.filter(fruit => {
      fruit.toLowerCase.includes(this.state.searchQuery.toLowerCase())
    })
  }

  _handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value })
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
