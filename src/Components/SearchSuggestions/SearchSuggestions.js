import React, { Fragment } from 'react';
import classNames from 'classnames';

import './SearchSuggestions.scss';

// If the suggestion begins with the search query, emphasize the matches str
const getHighlightedSuggestion = (highlightedStr, suggestion) => {
  const suggestionStrList = suggestion.split(' ');
  const modifiedList = [];

  suggestionStrList.map((str, index) => {
    // If the suggestion is more than one word, add whitespace.
    if (index > 0) {
      modifiedList.push(' ');
    }

    if (str.toLowerCase().indexOf(highlightedStr.toLowerCase()) === 0) {
      const highlightedJSX = (
        <span>
          {str.slice(0, highlightedStr.length)}
        </span>
      );
      const strEnding = str.slice(highlightedStr.length);

      modifiedList.push(
        <Fragment key={`modified_suggestion_${index}`}>
          {highlightedJSX}
          {strEnding}
        </Fragment>
      );

    } else {
      modifiedList.push(str);
    }    
  });

  return modifiedList;
}

const SearchSuggestions = (props) => {
  return (
    <div className="search-suggestions">
      <ul>
        {props.suggestions.map((suggestion, index) => (
          <li
            key={`suggestions_${index}`}
            className={classNames(`suggestion-item suggestion-item-${index}`,
              {
                'is-active': props.activeItemIndex === index
              }
            )}
            onClick={(event) => props.onSuggectionClick(event, suggestion)}
          >
            {getHighlightedSuggestion(props.searchQuery, suggestion)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchSuggestions;