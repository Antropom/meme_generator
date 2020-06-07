import React from 'react';
import classnames from 'classnames';
import './Pics.css';

const Pics = (props) => {
  const { url, name, setSelectedImg, selectedImg } = props;
  return (
    <div className="base-pics-wrapper" onClick={() => setSelectedImg(url)}>
      <img
        className={classnames({
          'selected-img': url === selectedImg,
        })}
        src={url}
        alt={name}
      />
    </div>
  );
};

export default Pics;
