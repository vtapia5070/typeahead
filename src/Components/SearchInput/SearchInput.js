import React from 'react';

import './SearchInput.scss';

const SearchInput = (props) => {
  return (
    <div className="SearchInput">
      SearchInput
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default SearchInput;
