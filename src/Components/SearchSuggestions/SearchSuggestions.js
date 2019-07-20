import React from 'react';

const SearchSuggestions = (props) => {
  return (
    <div className="search-suggestions">
      <ul>
        {props.suggestions.map((suggestion, index) => (
          <li key={`suggestions_${index}`}>{suggestion}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchSuggestions;