import React, { useState } from 'react';

function Sentence() {

    const [topSentence, setTopSentence] = useState("");
    const [bottomSentence, setBottomSentence] = useState("");

    return (
        <div>
            <fieldset>
                <legend>Merci de faire des memes drôles</legend>
                <label htmlFor="">phrase du haut</label>
                <input type="text" name="" id="" value={topSentence} onChange={e => setTopSentence(e.target.value)} />
                <label htmlFor="">phrase du bas</label>
                <input type="text" name="" id="" value={bottomSentence} onChange={e => setBottomSentence(e.target.value)} />
            </fieldset>
        </div>
    )

}

export default Sentence;