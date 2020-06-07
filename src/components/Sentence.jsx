import React, { useState } from 'react';
import './component.css'

function Sentence() {

    const [topSentence, setTopSentence] = useState("");
    const [bottomSentence, setBottomSentence] = useState("");

    return (
        <div className="block-component">
            <fieldset className="flex column">
                <legend>Merci de faire des memes drôles</legend>
                <label className="small-title" htmlFor="">phrase du haut</label>
                <input className="input" type="text" name="" id="" value={topSentence} onChange={e => setTopSentence(e.target.value)} />
                <label className="small-title" htmlFor="">phrase du bas</label>
                <input className="input" type="text" name="" id="" value={bottomSentence} onChange={e => setBottomSentence(e.target.value)} />
            </fieldset>
        </div>
    )

}

export default Sentence;