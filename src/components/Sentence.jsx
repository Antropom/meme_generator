import React from 'react';
import './component.css';

function Sentence({
  topSentence,
  setTopSentence,
  bottomSentence,
  setBottomSentence,
  handlesubmit,
  selectedtImg,
  missField,
}) {
  return (
    <div className="flex size field">
      <h4 className="cursor-default">{`2) Merci de faire des memes drôles`}</h4>
      <label className="small-title" htmlFor="">
        {`Phrase du haut`}
      </label>
      <input
        className="input"
        type="text"
        name=""
        id=""
        value={topSentence}
        onChange={(e) => setTopSentence(e.target.value.toUpperCase())}
      />
      <label className="small-title" htmlFor="">
        {`Phrase du bas`}
      </label>
      <input
        className="input"
        type="text"
        name=""
        id=""
        value={bottomSentence}
        onChange={(e) => setBottomSentence(e.target.value.toUpperCase())}
      />
      <div className="flex row">
        <button
          className="cursor-pointer"
          onClick={() => {
            if (selectedtImg !== '') {
              if (topSentence !== '' || bottomSentence !== '') {
                return handlesubmit();
              }
            }
            return missField();
          }}
        >
          {`Envoyer`}
        </button>
        {/* <button className="cursor-pointer">Télécharger</button> */}
      </div>
      <h4 className="cursor-default">{`3) Partagez-le massivement`}</h4>
    </div>
  );
}

export default Sentence;
