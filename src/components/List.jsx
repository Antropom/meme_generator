import React from 'react';
import Result from './Result';

const List = (props) => {
  const { listMeme, basePics } = props;
  return (
    <div>
      {listMeme.map((item) => {
        const picture = basePics.find((pic) => item.base_pics_id === pic.id);
        return (
          <Result
            topSentence={item.txt1}
            bottomSentence={item.txt2}
            selectedImg={picture && picture.url}
          />
        );
      })}
    </div>
  );
};

export default List;
