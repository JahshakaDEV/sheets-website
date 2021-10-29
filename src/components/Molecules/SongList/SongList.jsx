import "./SongList.css"
import ShowDifficulty from "../../Atoms/ShowDifficulty/ShowDifficulty";


function SongList({songList, setSelectedSong, setShowList, setBackToList}) {

    const tableRow = (song, color) => {
        return (<tr key={song.title} className={"songlist__row"} style={color ? {} : {backgroundColor: "lightgray"}}
                    onClick={() => {
                        setSelectedSong(song);
                        setShowList(false);
                        setBackToList(true);
                    }}
        >
            <td>{song.title}</td>
            <td>{song.interpret}</td>
            <td><ShowDifficulty editMode={false} difficulty={song.difficulty}/></td>
            {/*Tags*/}
        </tr>)
    }

    let color = true;

    return (
        <div className="songlist">
            <table>
                <thead>
                <tr>
                    <th>Titel</th>
                    <th>Interpret</th>
                    <th>Schwierigkeit</th>
                </tr>
                </thead>
                <tbody>
                {songList.map(song => {
                        color = !color;
                        return (tableRow(song, color));
                    }
                )}
                </tbody>
            </table>
        </div>
    );
}

export default SongList;