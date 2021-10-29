import "./SongPreview.css";
import Thumbnail from "../../Atoms/Thumbnail/Thumbnail";
import ShowDifficulty from "../../Atoms/ShowDifficulty/ShowDifficulty";

function SongPreview({songProp, setSelectedSong, setBackToList, key}) {

    return <div className={"preview"} onClick={event => {
        setSelectedSong(songProp);
        setBackToList(false);
    }}>
        <Thumbnail song={songProp} isLink={false}/>
        <div className={"preview__infos"}>
            <p><b>{songProp.title}</b><br/>{songProp.interpret}</p>
            <ShowDifficulty editMode={false} difficulty={songProp.difficulty}/>
        </div>
    </div>
}

export default SongPreview;

