import "./Search.css"
import RandomSongButton from "../../Atoms/RandomSongButton/RandomSongButton";

function Search({
                    songList,
                    setSelectedSong,
                    hideButtons,
                    setAddScreen,
                    setShowList,
                    backToList,
                    setBackToList,
                    setSearchValue,
                    id,
                    defaultValue,
                    autoFocus
                }) {

    if (hideButtons) {
        return (
            <div className="searchbar">
                <input type="text" placeholder="Suche..." onChange={event => {
                    event.preventDefault();
                    setSearchValue(event.target.value);
                }} defaultValue={defaultValue}/>
            </div>
        )
    } else {
        return (
            <div className="search">
                <h1 id={"button"} onClick={() => {
                    setSelectedSong(null);
                    setShowList(false)
                }
                }>←</h1>
                <div className="searchbar">
                    <input id={id} type="text" placeholder="Suche..." onChange={event => {
                        event.preventDefault();
                        setSearchValue(event.target.value);
                    }} defaultValue={defaultValue} autoFocus={autoFocus}/>
                </div>
                <RandomSongButton songList={songList} setSelectedSong={setSelectedSong} setListView={setShowList}
                                  setBackToList={setBackToList} backToList={backToList}
                                  setSearchValue={setSearchValue}/>
                <p className="add__button" onClick={event => {
                    event.preventDefault();
                    setSearchValue("");
                    setSelectedSong(null);
                    setAddScreen(true);
                    setShowList(false);
                }}>＋</p>
            </div>
        )
    }
}

export default Search;