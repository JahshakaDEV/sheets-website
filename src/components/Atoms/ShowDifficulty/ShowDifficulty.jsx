import "./ShowDifficulty.css";
import {useState} from "react";
import {SongListService} from "../../../Services/SongListService";

function ShowDifficulty({difficulty, editMode, song}) {

    const [difficultyState, setDifficultyState] = useState(difficulty);

    if (editMode) {
        return (<div className={"show__difficulty"}>
            {
                [1, 2, 3, 4, 5].map(score => {
                    if (score <= difficultyState) {
                        return <p key={score} className={"difficulty__star"}
                                  onClick={event => {
                                      event.preventDefault();
                                      setDifficultyState(score);
                                      SongListService.changeFieldValue(song, "difficulty", score);
                                  }
                                  }>★</p>
                    } else {
                        return <p key={score} className={"difficulty__star"}
                                  onClick={event => {
                                      event.preventDefault();
                                      setDifficultyState(score);
                                      SongListService.changeFieldValue(song, "difficulty", score);
                                  }
                                  }>☆</p>;
                    }
                })
            }
        </div>)
    } else {
        return (
            <div className={"show__difficulty"}>
                {
                    [1, 2, 3, 4, 5].map(score => {
                        if (score <= difficultyState) {
                            return <p key={score} className={"difficulty__star"}>★</p>;
                        } else {
                            return <p key={score} className={"difficulty__star"}>☆</p>;
                        }
                    })
                }
            </div>
        )
    }
}

export default ShowDifficulty;