import React from 'react';
import Pics from './Pics';

function PicsList({ basePics, selectedImg, setSelectedImg }) {
  return (
    <>
      {basePics &&
        basePics.map((pic) => {
          return (
            <Pics
              name={pic.name}
              url={pic.url}
              setSelectedImg={setSelectedImg}
              selectedImg={selectedImg}
            />
          );
        })}
    </>
  );
}

export default PicsList;
