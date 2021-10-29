import Search from "../../Molecules/Search/Search";
import "./LandingPage.css"
import {SongListService} from "../../../Services/SongListService";
import SongPreview from "../../Molecules/SongPreview/SongPreview";

function LandingPage({setSelectedSong, setShowList, setBackToList, setSearchValue}) {

    document.title = "Sheet saver";
    return (
        <div className={"landingpage"}>
            <div className={"landingpage__header"}>
                <Search hideButtons={true} setSearchValue={setSearchValue}/>
            </div>
            <div className={"landingpage__songs"}>
                {SongListService.getRandomSongs(SongListService.songListSizeLandingPageCheck()).map(song => {
                    return (
                        <div key={song.title}><SongPreview songProp={song} setSelectedSong={setSelectedSong}
                                                           setBackToList={setBackToList}/></div>)
                })}

            </div>
            <div className={"landingpage__showall"}>
                <p onClick={event => {
                    event.preventDefault();
                    setShowList(true);
                }}>Alle Songs anzeigen</p>
            </div>
        </div>
    );
}

export default LandingPage;