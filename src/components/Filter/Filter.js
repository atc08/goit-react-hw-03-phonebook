import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, onchangeFilter }) => {
  return (
    <label>
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={onchangeFilter}
        placeholder="Enter name for search"
      />
    </label>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onchangeFilter: PropTypes.func,
};

export default Filter;
