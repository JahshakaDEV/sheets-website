import {useEffect, useState} from "react";
import "./AddSongScreen.css"

function AddSongScreen({setListView, setAddSong, addSongHandler}) {

    const [title, setTitle] = useState("");
    const [interpret, setinterpret] = useState("");
    const [difficulty, setDifficulty] = useState(1)
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        if (title !== "" && interpret !== "") {
            setIsReady(true);
        } else {
            setIsReady(false);
        }

    }, [title, interpret])

    const onSaveHandler = (event) => {
        event.preventDefault();
        if (isReady) {
            addSongHandler({
                title,
                interpret,
                difficulty,
                youtube: [],
                sheetMusic: [],
                notes: ''
            });

            setListView(true);
            setAddSong(false);
        } else {

        }
    }


    return <div className={"addsong"}>
        <div className={"addsong__header"}>
            <h1 id="back__button" onClick={event => {
                setListView(true);
                setAddSong(false);
            }
            }>←</h1>
            <h1>Füge einen neuen Song hinzu:</h1>
        </div>
        <div className={"addsong__form"}>
            <form onSubmit={onSaveHandler}>
                <label>
                    Titel:<br/>
                    <input type={"text"} onChange={event => {
                        setTitle(event.target.value);
                    }
                    }/>
                </label>
                <br/>
                <br/>
                <label>
                    Interpret:<br/>
                    <input type={"text"} onChange={event => {
                        setinterpret(event.target.value);
                    }
                    }/>
                </label>
                <p style={{marginBottom: "0"}}>Schwierigkeit:</p>
                <div className={"addsong__difficulty"}>
                    {[1, 2, 3, 4, 5].map(score => {
                        if (score <= difficulty) {
                            return <p key={score} onClick={event => {
                                event.preventDefault();
                                setDifficulty(score);
                            }
                            }>★</p>
                        } else {
                            return <p key={score} onClick={event => {
                                event.preventDefault();
                                setDifficulty(score);
                            }
                            }>☆</p>
                        }
                    })}

                </div>
                <div>
                    <button type={"submit"} style={isReady ? {} : {visibility: "hidden"}}>
                        Fertig!
                    </button>
                </div>
            </form>
        </div>
    </div>
}

export default AddSongScreen;