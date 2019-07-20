import React, { Component } from 'react';

import './SearchInput.scss';

class SearchInput extends Component {

  render () {
    const { value, onChange, onArrowPush } = this.props;
    return (
      <div className="SearchInput">
        SearchInput
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyUp={onArrowPush}
        />
      </div>
    );
  }
}

export default SearchInput;
