import React from 'react';
import classNames from 'classnames';

import './SearchSuggestions.scss';

const SearchSuggestions = (props) => {
  return (
    <div className="search-suggestions">
      <ul>
        {props.suggestions.map((suggestion, index) => (
          <li
            key={`suggestions_${index}`}
            className={classNames(
              {
                'is-active': props.activeItemIndex === index
              }
            )}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchSuggestions;