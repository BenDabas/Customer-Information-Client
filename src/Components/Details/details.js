import React, { useState } from 'react';

import './details.css';

const Details = ({ name, label, row1, onInputChange, clear }) => {
  return (
    <div className={('details ', row1 ? 'row1' : '')}>
      {clear ? (
        <input
          className="input"
          name={name}
          onChange={onInputChange}
          value=""
        />
      ) : (
        <input className="input" name={name} onChange={onInputChange} />
      )}

      <label className="label" name={label}>
        {label}
      </label>
    </div>
  );
};

export default Details;
