import React from 'react';

const Pics = (props) => {
  const { url, name } = props;
  return (
    <div className="base-pics-wrapper">
      <img src={url} alt={name} />
    </div>
  );
};

export default Pics;
