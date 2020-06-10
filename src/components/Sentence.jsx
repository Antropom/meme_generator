import React from 'react';
import './component.css'

function Sentence({ topSentence, setTopSentence, bottomSentence, setBottomSentence, handlesubmit }) {

    return (
        <div className="block-component">
            <fieldset className="flex column">
                <legend>Merci de faire des memes drôles</legend>
                <label className="small-title" htmlFor="">phrase du haut</label>
                <input className="input" type="text" name="" id="" value={topSentence} onChange={e => setTopSentence(e.target.value)} />
                <label className="small-title" htmlFor="">phrase du bas</label>
                <input className="input" type="text" name="" id="" value={bottomSentence} onChange={e => setBottomSentence(e.target.value)} />
                <div className="flex row">
                    <button onClick={handlesubmit}>Envoyer</button>
                    <button>Télécharger</button>
                </div>
            </fieldset>
        </div>
    )

}

export default Sentence;